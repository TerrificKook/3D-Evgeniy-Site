import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HomeLeadForm } from '@/components/home-lead-form';
import { absoluteSiteUrl, siteConfig, withBasePath } from '@/config/site';

const homeTitle = '3D-печать на заказ для бизнеса в Москве и области';
const homeDescription = 'Изготовление нестандартных пластиковых деталей в Москве: корпуса для электроники, детали по образцу и оснастка. Сначала техническая задача и пилот, затем повтор.';

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: absoluteSiteUrl() },
  openGraph: { title: homeTitle, description: homeDescription, url: absoluteSiteUrl() },
};

const taskTypes = [
  { title: 'Крепления и кронштейны', image: '/images/category-bracket-generated.webp', className: 'gallery-item-large' },
  { title: 'Соединители и переходники', image: '/images/category-adapter-generated.webp', className: 'gallery-item-medium' },
  { title: 'Заглушки и адаптеры', image: '/images/hero-generated.webp', className: 'gallery-item-small' },
  { title: 'Корпуса и кожухи', image: '/images/category-enclosure-generated.webp', className: 'gallery-item-medium' },
  { title: 'Оснастка и держатели', image: '/images/category-jig-generated.webp', className: 'gallery-item-large' },
  { title: 'Детали по образцу', image: '/images/category-bracket-generated.webp', className: 'gallery-item-small gallery-item-detail' },
];

const orderSteps = [
  ['Пришлите задачу', 'Фото, файл, эскиз или размеры.'],
  ['Уточним требования', 'Количество, назначение и условия использования.'],
  ['Сделаем образец', 'Если задача требует проверки, сначала согласуем тестовый экземпляр.'],
  ['Запустим изготовление', 'После согласования детали можно повторять без возвращения к задаче с нуля.'],
];

const equipment = [
  'Bambu Lab X1 Carbon Combo',
  'Bambu Lab H2D Combo',
  'Voron 2.4 350',
  'Anycubic Photon Mono X2',
];

const contactOptions = [
  { label: 'Telegram', value: siteConfig.contacts.telegram, href: siteConfig.contacts.telegram },
  { label: 'WhatsApp', value: siteConfig.contacts.whatsapp, href: siteConfig.contacts.whatsapp },
  { label: 'Телефон', value: siteConfig.contacts.phone, href: siteConfig.contacts.phone ? 'tel:' + String(siteConfig.contacts.phone) : '' },
  { label: 'Email', value: siteConfig.contacts.email, href: siteConfig.contacts.email ? 'mailto:' + String(siteConfig.contacts.email) : '' },
].filter((item) => item.value && item.href);

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteConfig.displayName,
            url: absoluteSiteUrl(),
            description: homeDescription,
            inLanguage: 'ru-RU',
          }).replace(/</g, '\\u003c'),
        }}
      />

      <section className="home-hero section-shell">
        <div className="home-hero-copy">
          <p className="eyebrow">Инженерная мастерская в Москве</p>
          <h1>3D-печать пластиковых деталей для бизнеса в Москве и Московской области</h1>
          <p className="home-hero-lead">
            Изготавливаем корпуса для электроники, детали по образцу, крепления и оснастку.
            Сначала разбираем техническую задачу и проверяем пилот, затем согласованную версию можно повторять небольшой партией.
          </p>
          <div className="home-hero-actions">
            <a className="button button-primary button-large" href="#contact">
              Оценить задачу <ArrowUpRight aria-hidden="true" size={19} />
            </a>
            <p>Можно прислать фото, чертёж, STL / STEP, эскиз или размеры.</p>
          </div>
          <ul className="hero-tags" aria-label="Форматы работы">
            {['По образцу', 'STL / STEP', 'Прототип', 'Повторяемая партия'].map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <figure className="home-hero-visual">
          <Image src={withBasePath('/images/hero-generated.webp')} width={1536} height={1024} priority sizes="(max-width: 900px) 100vw, 50vw" alt="Визуализация функциональных пластиковых деталей на рабочем столе" />
          <figcaption>Сгенерированная визуализация для прототипа</figcaption>
        </figure>
      </section>

      <section className="tasks-section" id="tasks" aria-labelledby="tasks-title">
        <div className="section-shell section-block">
          <div className="section-heading tasks-heading">
            <div>
              <p className="eyebrow">Примеры задач</p>
              <h2 id="tasks-title">Что можно изготовить</h2>
            </div>
            <p>Функциональные детали под конкретную конструкцию, узел или рабочую операцию.</p>
          </div>
          <div className="task-gallery">
            {taskTypes.map((task, index) => (
              <figure className={`gallery-item ${task.className}`} key={task.title}>
                <Image src={withBasePath(task.image)} width={1536} height={1024} loading="eager" sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 40vw" alt={`Визуализация: ${task.title.toLowerCase()}`} />
                <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{task.title}</figcaption>
              </figure>
            ))}
          </div>
          <p className="visual-note">Изображения в этой версии — сгенерированные иллюстрации направлений. Перед публикацией их заменят реальные фотографии мастерской.</p>
        </div>
      </section>

      <section className="case-section" id="case" aria-labelledby="case-title">
        <div className="section-shell case-layout">
          <figure className="case-visual">
            <Image src={withBasePath('/images/category-adapter-generated.webp')} width={1536} height={1024} loading="eager" sizes="(max-width: 900px) 100vw, 52vw" alt="Визуализация соединителей для сборной трубной конструкции" />
            <figcaption>Визуализация типа задачи. Реальные фотографии проекта будут добавлены перед публикацией.</figcaption>
          </figure>
          <div className="case-copy">
            <p className="eyebrow eyebrow-light">Опыт мастерской</p>
            <h2 id="case-title">Нестандартная фурнитура для сборных конструкций</h2>
            <p className="case-lead">Стандартной фурнитуры оказалось недостаточно, поэтому для задачи были изготовлены специальные пластиковые элементы под конкретную конструкцию.</p>
            <div className="case-flow" aria-label="Принцип решения задачи">
              {['Нестандартная задача', 'Специальная деталь', 'Повторяемое решение'].map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                  {index < 2 && <ArrowRight aria-hidden="true" size={19} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="production-section section-shell section-block" id="production" aria-labelledby="production-title">
        <div className="production-heading">
          <div>
            <p className="eyebrow">Оборудование</p>
            <h2 id="production-title">Производство</h2>
          </div>
          <p>Несколько принтеров позволяют параллельно делать прототипы, проверочные экземпляры и повторяемые детали. Возможность производства конкретной задачи оцениваем по файлу, образцу и условиям эксплуатации.</p>
        </div>
        <div className="production-layout">
          <figure className="production-visual">
            <Image src={withBasePath('/images/workshop-generated.webp')} width={1536} height={1024} loading="eager" sizes="(max-width: 900px) 100vw, 65vw" alt="Сгенерированная визуализация небольшой мастерской с 3D-принтерами" />
            <figcaption>Сгенерированная визуализация мастерской</figcaption>
          </figure>
          <ol className="equipment-list">
            {equipment.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className="order-section" id="order" aria-labelledby="order-title">
        <div className="section-shell section-block">
          <div className="section-heading order-heading">
            <p className="eyebrow">Четыре понятных шага</p>
            <h2 id="order-title">Как заказать деталь</h2>
          </div>
          <ol className="order-steps">
            {orderSteps.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="limits-section section-shell" aria-labelledby="limits-title">
        <p className="eyebrow">Важно до начала работы</p>
        <div>
          <h2 id="limits-title">3D-печать подходит не для каждой детали</h2>
          <p>До начала работы оцениваем нагрузку, температуру, условия эксплуатации и требования к детали. Если 3D-печать для задачи технически не подходит, лучше сказать об этом до изготовления образца.</p>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="section-shell contact-layout">
          <div className="contact-copy">
            <p className="eyebrow eyebrow-light">Начнём с вашей задачи</p>
            <h2 id="contact-title">Есть деталь или задача?</h2>
            <p>Пришлите фото, файл, эскиз или размеры. Посмотрим, подходит ли задача для изготовления и что потребуется для оценки.</p>
            <a className="button button-light button-large" href="#task-form">
              Оценить задачу <ArrowUpRight aria-hidden="true" size={19} />
            </a>
            {contactOptions.length > 0 && (
              <div className="contact-options" aria-label="Контакты мастерской">
                {contactOptions.map((item) => <a href={item.href} key={item.label}>{item.label}<ArrowUpRight aria-hidden="true" size={15} /></a>)}
              </div>
            )}
          </div>
          <HomeLeadForm />
        </div>
      </section>
    </main>
  );
}
