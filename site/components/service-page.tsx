import Link from 'next/link';
import { ArrowRight, Check, CircleAlert, ClipboardList } from 'lucide-react';
import type { ServicePageContent } from '@/content/service-pages';
import { Breadcrumbs } from '@/components/breadcrumbs';

export function ServicePage({ content }: { content: ServicePageContent }) {
  return (
    <main>
      <section className="page-hero section-shell">
        <Breadcrumbs current={content.eyebrow} />
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="page-lead">{content.intro}</p>
        <Link className="button button-primary" href={`/contacts/?service=${content.slug}`}>
          Прислать исходные данные <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>

      <section className="section-shell split-block section-block">
        <div>
          <p className="eyebrow">Кому подходит</p>
          <h2>Проверяемая задача, а не обещание заранее</h2>
        </div>
        <ul className="check-list">
          {content.fitFor.map((item) => <li key={item}><Check aria-hidden="true" size={18} />{item}</li>)}
        </ul>
      </section>

      <section className="surface-section">
        <div className="section-shell section-block">
          <div className="section-heading">
            <p className="eyebrow">Типовые ситуации</p>
            <h2>Что можно принести на первичную оценку</h2>
          </div>
          <div className="three-column-list">
            {content.examples.map((item, index) => (
              <article key={item}><span>0{index + 1}</span><p>{item}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell requirement-grid section-block">
        <article>
          <ClipboardList aria-hidden="true" size={28} />
          <h2>Что нужно прислать</h2>
          <ul>{content.inputs.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <Check aria-hidden="true" size={28} />
          <h2>Что проверяется на пилоте</h2>
          <ul>{content.pilotChecks.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="warning-card">
          <CircleAlert aria-hidden="true" size={28} />
          <h2>Что не обещаем и не берём без проверки</h2>
          <ul>{content.exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className="section-shell section-block faq-section">
        <div className="section-heading compact"><p className="eyebrow">Короткие ответы</p><h2>До отправки задачи</h2></div>
        <div className="faq-list">
          {content.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section-shell inline-cta">
        <div><p className="eyebrow">Следующий шаг</p><h2>Опишите изделие и способ проверки</h2></div>
        <Link className="button button-light" href={`/contacts/?service=${content.slug}`}>
          Перейти к форме <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
