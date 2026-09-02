import Link from 'next/link';
import { ArrowRight, Box, Component, Gauge, ShieldCheck } from 'lucide-react';
import { services } from '@/content/services';

const icons = { component: Component, box: Box, gauge: Gauge };

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Инженерная мастерская',
            url: '/',
            description: 'Квалификация деталей по образцу, корпусов электроники и производственной оснастки.',
          }).replace(/</g, '\\u003c'),
        }}
      />
      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Инженерная мастерская · локальный staging</p>
          <h1>Функциональные пластиковые детали и корпуса для бизнеса</h1>
          <p className="hero-lead">
            Оцениваем некритичные детали по образцу, корпуса под электронику и производственную оснастку.
            Сначала разбираем задачу и проверяем пилот — затем обсуждаем партию и повтор.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contacts/">
              Прислать задачу на оценку <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="text-link" href="/vozmozhnosti-i-ogranicheniya/">Какие задачи подходят</Link>
          </div>
          <p className="hero-note">
            Не считаем цену за грамм и не обещаем применимость до технической квалификации.
          </p>
        </div>

        <div className="technical-panel" aria-label="Порядок первичной оценки">
          <div className="technical-panel-top"><span>Входные данные</span><span>01—04</span></div>
          <ol>
            <li><span>01</span>Назначение изделия</li>
            <li><span>02</span>Размеры и исходные данные</li>
            <li><span>03</span>Условия и последствия отказа</li>
            <li><span>04</span>Количество и способ проверки</li>
          </ol>
          <div className="technical-panel-result">
            <ShieldCheck aria-hidden="true" size={22} />
            <p>Результат входа: «подходит», «не подходит» или «нужны данные».</p>
          </div>
        </div>
      </section>

      <section className="section-shell section-block" aria-labelledby="scenarios-title">
        <div className="section-heading">
          <p className="eyebrow">Три покупательские ситуации</p>
          <h2 id="scenarios-title">Начните не с технологии, а со своей задачи</h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <article className="service-card" key={service.slug}>
                <div className="service-card-meta">
                  <span className="service-icon"><Icon aria-hidden="true" size={22} /></span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{service.cardTitle}</h3>
                <p>{service.summary}</p>
                <Link href={service.href}>Разобрать задачу <ArrowRight aria-hidden="true" size={17} /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell section-block process-section" aria-labelledby="process-title">
        <div className="section-heading compact">
          <p className="eyebrow">Рабочая схема</p>
          <h2 id="process-title">От задачи к воспроизводимой версии</h2>
        </div>
        <ol className="process-list">
          {[
            ['Квалификация', 'Проверяем назначение, исходные данные и риски.'],
            ['Подготовка', 'Отдельно оцениваем инженерную работу и тестовый экземпляр.'],
            ['Платный пилот', 'Согласуем, как именно будет проверяться результат.'],
            ['Партия', 'Рассчитывается только после принятого пилота.'],
            ['Повтор', 'Сохраняется одобренная ревизия изделия.'],
          ].map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-shell closing-panel">
        <div>
          <p className="eyebrow">Сначала безопасность и проверка</p>
          <h2>Не каждая деталь подходит для такого способа изготовления</h2>
        </div>
        <div>
          <p>
            Критичные и ответственные задачи без отдельной квалификации не принимаются. Материал,
            конструкция, срок и объём определяются после оценки исходных данных.
          </p>
          <Link className="button button-light" href="/contacts/">Описать задачу <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
