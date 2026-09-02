import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Пилот, контроль и приёмка',
  description: 'Порядок квалификации, платного пилота, согласования проверки, фиксации ревизии и перехода к партии.',
  alternates: { canonical: '/quality-and-acceptance/' },
};

const stages = [
  ['01', 'Квалификация', 'Определяем назначение, исходные данные, условия, риск отказа и недостающую информацию.'],
  ['02', 'Инженерная подготовка', 'Отдельно согласуется объём моделирования, адаптации или проверки исходной модели.'],
  ['03', 'Платный пилот', 'До изготовления фиксируется, что именно клиент будет измерять, собирать или испытывать.'],
  ['04', 'Проверка и ревизия', 'Замечания относятся к конкретной версии. Порядок итераций требует коммерческого подтверждения.'],
  ['05', 'Партия и повтор', 'Количество и срок считаются после принятия пилота; одобренная версия сохраняется для воспроизводимости.'],
];

export default function QualityPage() {
  return (
    <main>
      <section className="page-hero section-shell short">
        <Breadcrumbs current="Пилот, контроль и приёмка" />
        <p className="eyebrow">Качество через проверяемый процесс</p>
        <h1>Пилот нужен, чтобы проверить функцию — не чтобы угадать результат</h1>
        <p className="page-lead">Допуски, материал и ресурс нельзя обещать одинаково для всех изделий. Поэтому критерий приёмки согласуется вместе с задачей.</p>
      </section>
      <section className="section-shell section-block">
        <ol className="quality-timeline">
          {stages.map(([number, title, text]) => (
            <li key={number}><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div></li>
          ))}
        </ol>
      </section>
      <section className="surface-section">
        <div className="section-shell acceptance-grid section-block">
          <div><p className="eyebrow">Примеры критериев</p><h2>Что можно согласовать до пилота</h2></div>
          <ul>
            <li>посадка на конкретную сопрягаемую деталь;</li>
            <li>доступ к разъёмам, крепежу и сборке;</li>
            <li>контроль согласованных размеров выбранным инструментом;</li>
            <li>проверка операции в безопасном режиме;</li>
            <li>фиксация принятой ревизии и замечаний.</li>
          </ul>
        </div>
      </section>
      <section className="section-shell inline-cta">
        <div><p className="eyebrow">Подготовьте критерий</p><h2>Как вы поймёте, что пилот подходит?</h2></div>
        <Link className="button button-light" href="/contacts/">Описать проверку <ArrowRight aria-hidden="true" size={18} /></Link>
      </section>
    </main>
  );
}
