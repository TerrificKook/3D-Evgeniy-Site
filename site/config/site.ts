export const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';

const githubPagesBasePath = isGitHubPages
  ? '/3D-Evgeniy-Site'
  : '';

export const siteConfig = {
  displayName: 'EVGENIY 3D WORKSHOP',
  brand: { primary: 'EVGENIY', secondary: '3D WORKSHOP' },
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  basePath: githubPagesBasePath,
  contacts: { phone: '', email: '', telegram: '', whatsapp: '' },
  geography: '',
  responseSla: '',
} as const;

export function withBasePath(path: string) {
  if (!isGitHubPages || !path.startsWith('/')) return path;
  const [, pathname = path, suffix = ''] = path.match(/^([^?#]*)(.*)$/u) || [];
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/u, '') : pathname;
  return `${githubPagesBasePath}${normalizedPath}${suffix}`;
}

export function absoluteSiteUrl(path = '') {
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path;
  return `${siteConfig.origin.replace(/\/$/u, '')}${normalizedPath}`;
}
