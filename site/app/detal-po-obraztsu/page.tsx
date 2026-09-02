import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/content/service-pages';

const content = servicePages['detal-po-obraztsu'];
export const metadata: Metadata = { title: content.eyebrow, description: content.description, alternates: { canonical: '/detal-po-obraztsu/' } };
export default function Page() { return <ServicePage content={content} />; }
