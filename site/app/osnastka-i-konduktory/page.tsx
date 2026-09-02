import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/content/service-pages';

const content = servicePages['osnastka-i-konduktory'];
export const metadata: Metadata = { title: content.eyebrow, description: content.description, alternates: { canonical: '/osnastka-i-konduktory/' } };
export default function Page() { return <ServicePage content={content} />; }
