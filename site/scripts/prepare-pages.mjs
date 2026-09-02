import { access, copyFile, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join, normalize, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = join(siteRoot, 'dist', 'client');
const basePath = '/3D-Evgeniy-Site';

await access(join(outputRoot, 'index.html'));
await access(join(outputRoot, 'manifest.webmanifest'));
await access(join(outputRoot, 'favicon.svg'));

const prefixedNextDirectory = join(outputRoot, basePath.slice(1), '_next');
const publicNextDirectory = join(outputRoot, '_next');
try {
  await rename(prefixedNextDirectory, publicNextDirectory);
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}
await writeFile(join(outputRoot, '.nojekyll'), '', 'utf8');

try {
  await copyFile(join(outputRoot, '_not-found.html'), join(outputRoot, '404.html'));
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

const htmlFiles = await filesUnder(outputRoot, '.html');
const missing = [];
const wrongBasePath = [];

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/gu)].map((match) => match[1]);

  for (const reference of references) {
    if (!reference.startsWith('/') || reference.startsWith('//')) continue;
    if (!reference.startsWith(`${basePath}/`)) {
      wrongBasePath.push(`${relative(outputRoot, htmlFile)} -> ${reference}`);
      continue;
    }

    const cleanPath = decodeURIComponent(reference.slice(basePath.length).split(/[?#]/u, 1)[0]);
    if (cleanPath === '/' || cleanPath.endsWith('/')) continue;
    const localPath = normalize(join(outputRoot, cleanPath));
    if (!localPath.startsWith(`${normalize(outputRoot)}${sep}`)) {
      missing.push(`${relative(outputRoot, htmlFile)} -> ${reference}`);
      continue;
    }
    const candidates = [localPath, `${localPath}.html`, join(localPath, 'index.html')];
    if (!await firstExisting(candidates)) {
      missing.push(`${relative(outputRoot, htmlFile)} -> ${reference}`);
    }
  }
}

if (wrongBasePath.length || missing.length) {
  if (wrongBasePath.length) console.error('Ссылки без GitHub Pages base path:\n' + wrongBasePath.join('\n'));
  if (missing.length) console.error('Отсутствующие файлы:\n' + missing.join('\n'));
  process.exit(1);
}

console.log(`GitHub Pages output проверен: ${htmlFiles.length} HTML-файлов, base path и ассеты корректны.`);

async function filesUnder(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path, extension));
    else if (entry.name.endsWith(extension)) files.push(path);
  }
  return files;
}

async function firstExisting(paths) {
  for (const path of paths) {
    try {
      await access(path);
      return path;
    } catch {
      // Try the next GitHub Pages-compatible path form.
    }
  }
  return null;
}
