import { readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const roots = ['app', 'components', 'config', 'content', 'lib', 'public'];
const extensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.svg', '.txt']);
const forbidden = [
  { label: 'служебный маркер подтверждения', pattern: /\[НУЖНО ПОДТВЕРДИТЬ/giu },
  { label: 'TODO', pattern: /\bTODO\b/gu },
  { label: 'рыбный текст', pattern: /lorem ipsum/giu },
];

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await filesUnder(path));
    else if (extensions.has(extname(entry.name))) result.push(path);
  }
  return result;
}

const findings = [];
for (const root of roots) {
  for (const file of await filesUnder(root)) {
    const source = await readFile(file, 'utf8');
    for (const rule of forbidden) {
      if (rule.pattern.test(source)) findings.push(file + ': ' + rule.label);
      rule.pattern.lastIndex = 0;
    }
  }
}

if (findings.length) {
  console.error('Найдены служебные или запрещённые фрагменты:');
  for (const finding of findings) console.error('- ' + finding);
  process.exit(1);
}

if (process.argv.includes('--production')) {
  const missing = [];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  if (!siteUrl.startsWith('https://') || /localhost|127\.0\.0\.1/u.test(siteUrl)) missing.push('NEXT_PUBLIC_SITE_URL=https://...');
  if (!/^\d+$/u.test(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '')) missing.push('NEXT_PUBLIC_YANDEX_METRIKA_ID');
  if (!process.env.LEAD_ADAPTER || process.env.LEAD_ADAPTER === 'mock') missing.push('LEAD_ADAPTER (не mock)');
  if (process.env.NEXT_PUBLIC_SITE_MODE !== 'production') missing.push('NEXT_PUBLIC_SITE_MODE=production');
  if (process.env.PUBLIC_CONTENT_CONFIRMED !== 'true') missing.push('PUBLIC_CONTENT_CONFIRMED=true');
  if (process.env.PRIVACY_POLICY_APPROVED !== 'true') missing.push('PRIVACY_POLICY_APPROVED=true');
  if (process.env.CONTACTS_CONFIRMED !== 'true') missing.push('CONTACTS_CONFIRMED=true');
  if (missing.length) {
    console.error('Публичный запуск заблокирован: не заполнены production-параметры.');
    for (const key of missing) console.error('- ' + key);
    process.exit(1);
  }
}

console.log('Контентная проверка пройдена: служебные маркеры в публичном коде не найдены.');
