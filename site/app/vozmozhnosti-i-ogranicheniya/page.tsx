import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, CircleAlert, XCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SiteLink } from '@/components/site-link';
import { absoluteSiteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Возможности и ограничения',
  description: 'Какие задачи можно квалифицировать, какие данные нужны и какие критичные применения исключаются на старте.',
  alternates: { canonical: absoluteSiteUrl('/vozmozhnosti-i-ogranicheniya') },
};

export default function LimitsPage() {
  return (
    <main>
      <section className="page-hero section-shell short">
        <Breadcrumbs current="Возможности и ограничения" />
        <p className="eyebrow">Технический фильтр</p>
        <h1>Сначала понять условия, затем решить: подходит ли пластик</h1>
        <p className="page-lead">Перечисленный парк оборудования не заменяет проверку задачи. Материалы, допуски, габариты, ресурс и мощность ещё не утверждены как публичные параметры.</p>
      </section>
      <section className="section-shell limit-grid section-block">
        <article>
          <CheckCircle2 aria-hidden="true" size={28} />
          <h2>Квалифицируем</h2>
          <ul>
            <li>некритичные детали с понятной функцией;</li>
            <li>корпуса и компоненты с доступной компоновкой;</li>
            <li>оснастку с описанной операцией и нагрузками;</li>
            <li>пилот с заранее согласованным способом проверки.</li>
          </ul>
        </article>
        <article>
          <CircleAlert aria-hidden="true" size={28} />
          <h2>Нужны данные</h2>
          <ul>
            <li>назначение и последствия отказа;</li>
            <li>геометрия, размеры, файлы или образец;</li>
            <li>температура, влага, химия и нагрузка;</li>
            <li>количество, цикличность и критерий приёмки.</li>
          </ul>
        </article>
        <article className="warning-card">
          <XCircle aria-hidden="true" size={28} />
          <h2>Исключаем на старте</h2>
          <ul>
            <li>металлические, медицинские, стоматологические и пищевые задачи;</li>
            <li>pressure, силовые и ответственные электрические детали;</li>
            <li>критичные автомобильные узлы;</li>
            <li>любое применение с риском вреда человеку или дорогому оборудованию без квалифицированного процесса.</li>
          </ul>
        </article>
      </section>
      <section className="section-shell evidence-note">
        <strong>Что пока нельзя обещать публично</strong>
        <p>Конкретные материалы и свойства, повторяемые допуски, максимальные габариты, срок ответа, срок изготовления, объём партии, процент брака, гарантию и ресурс.</p>
      </section>
      <section className="section-shell inline-cta">
        <div><p className="eyebrow">Не уверены в применимости?</p><h2>Опишите последствия отказа и способ проверки</h2></div>
        <SiteLink className="button button-light" href="/contacts/">Проверить задачу <ArrowRight aria-hidden="true" size={18} /></SiteLink>
      </section>
    </main>
  );
}
