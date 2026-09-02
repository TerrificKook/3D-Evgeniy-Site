import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteLink } from '@/components/site-link';
import { absoluteSiteUrl } from '@/config/site';
import { publicCases } from '@/content/cases';

export function generateStaticParams() { return publicCases.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = publicCases.find((entry) => entry.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.problem,
    alternates: { canonical: absoluteSiteUrl(`/cases/${item.slug}`) },
    openGraph: { title: item.title, description: item.problem, images: [] },
    twitter: { title: item.title, description: item.problem, images: [] },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = publicCases.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <main>
      <section className="page-hero section-shell short">
        <Breadcrumbs current={item.title} />
        <span className="status-badge">{item.status === 'demo' ? 'Демонстрационный шаблон — не выполненный заказ' : 'Клиентский проект'}</span>
        <h1>{item.title}</h1>
        <p className="page-lead">{item.problem}</p>
      </section>
      <section className="section-shell case-detail section-block">
        <article><p className="eyebrow">Исходные данные</p><ul>{item.inputData.map((value) => <li key={value}>{value}</li>)}</ul></article>
        <article><p className="eyebrow">Инженерная работа</p><ul>{item.engineeringWork.map((value) => <li key={value}>{value}</li>)}</ul></article>
        <article><p className="eyebrow">Приёмка</p><ul>{item.acceptanceMethod.map((value) => <li key={value}>{value}</li>)}</ul></article>
        <article><p className="eyebrow">Повтор</p><p>{item.repeatPotential}</p></article>
      </section>
      <section className="section-shell evidence-note">
        <strong>Граница доказательности</strong>
        <p>{item.confidentialityNote} Черновые поля модели намеренно не передаются в публичный компонент.</p>
      </section>
      <section className="section-shell inline-cta">
        <div><p className="eyebrow">Есть похожая задача?</p><h2>Опишите свои исходные данные</h2></div>
        <SiteLink className="button button-light" href="/contacts/">Перейти к форме <ArrowRight aria-hidden="true" size={18} /></SiteLink>
      </section>
    </main>
  );
}
