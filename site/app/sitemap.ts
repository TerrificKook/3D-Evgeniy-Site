import type { MetadataRoute } from 'next';
import { publicCases } from '@/content/cases';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/detal-po-obraztsu/', '/korpusa-dlya-elektroniki/', '/osnastka-i-konduktory/', '/cases/', '/vozmozhnosti-i-ogranicheniya/', '/quality-and-acceptance/', '/contacts/'];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.origin}${route}`, changeFrequency: 'monthly' as const, priority: route === '' ? 1 : 0.7 })),
    ...publicCases.map((item) => ({ url: `${siteConfig.origin}/cases/${item.slug}/`, changeFrequency: 'monthly' as const, priority: 0.5 })),
  ];
}
