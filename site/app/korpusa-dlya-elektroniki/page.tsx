import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/content/service-pages';
import { absoluteSiteUrl } from '@/config/site';

const content = servicePages['korpusa-dlya-elektroniki'];
export const metadata: Metadata = { title: content.eyebrow, description: content.description, alternates: { canonical: absoluteSiteUrl('/korpusa-dlya-elektroniki') } };
export default function Page() { return <ServicePage content={content} />; }
