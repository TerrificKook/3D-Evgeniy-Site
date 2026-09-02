import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { publicCases } from '@/content/cases';

export const metadata: Metadata = {
  title: 'Кейсы и шаблоны проектов',
  description: 'Только проверенные кейсы мастерской и явно отмеченные демонстрационные шаблоны без выдуманных результатов.',
  alternates: { canonical: '/cases/' },
};

export default function CasesPage() {
  return (
    <main>
      <section className="page-hero section-shell short">
        <Breadcrumbs current="Кейсы" />
        <p className="eyebrow">Доказательства без украшений</p>
        <h1>Кейсы появляются только после подтверждения фактов</h1>
        <p className="page-lead">Пока реальный проект не подготовлен к публикации, показываем только структуру будущей карточки — без клиента, цены, срока, материала и результата.</p>
      </section>
      <section className="section-shell section-block">
        <div className="case-grid">
          {publicCases.map((item) => (
            <article className="case-card" key={item.slug}>
              <div className="case-visual-placeholder">
                <FileCheck2 aria-hidden="true" size={34} />
                <span>Нужны реальные фотографии процесса и проверки</span>
              </div>
              <div className="case-card-body">
                <span className="status-badge">{item.status === 'demo' ? 'Демонстрационный шаблон' : 'Клиентский проект'}</span>
                <h2>{item.title}</h2>
                <p>{item.problem}</p>
                <Link href={`/cases/${item.slug}/`}>Открыть структуру <ArrowRight aria-hidden="true" size={17} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
