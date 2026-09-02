import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const githubPagesBasePath = '/3D-Evgeniy-Site';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      assetPrefix: githubPagesBasePath,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
