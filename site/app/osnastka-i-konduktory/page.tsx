import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/content/service-pages';
import { absoluteSiteUrl } from '@/config/site';

const content = servicePages['osnastka-i-konduktory'];
export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.description,
  alternates: { canonical: absoluteSiteUrl('/osnastka-i-konduktory') },
  openGraph: { title: content.seoTitle, description: content.description, url: absoluteSiteUrl('/osnastka-i-konduktory') },
};
export default function Page() { return <ServicePage content={content} />; }
