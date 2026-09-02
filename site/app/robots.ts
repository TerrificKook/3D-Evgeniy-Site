import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_SITE_MODE === 'production';
  return {
    rules: isProduction ? [{ userAgent: '*', allow: '/', disallow: ['/api/', '/privacy/'] }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${siteConfig.origin}/sitemap.xml`,
  };
}
