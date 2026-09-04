import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/content/service-pages';
import { absoluteSiteUrl } from '@/config/site';

const content = servicePages['detal-po-obraztsu'];
export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.description,
  alternates: { canonical: absoluteSiteUrl('/detal-po-obraztsu') },
  openGraph: { title: content.seoTitle, description: content.description, url: absoluteSiteUrl('/detal-po-obraztsu') },
};
export default function Page() { return <ServicePage content={content} />; }
