import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { LeadForm } from '@/components/lead-form';

export const metadata: Metadata = {
  title: 'Прислать техническую задачу',
  description: 'Квалификационная форма: назначение, исходные данные, размеры, условия, количество, последствия отказа и способ проверки.',
  alternates: { canonical: '/contacts/' },
};

export default function ContactsPage() {
  return (
    <main>
      <section className="page-hero section-shell short form-intro">
        <Breadcrumbs current="Форма задачи" />
        <p className="eyebrow">Главная конверсия сайта</p>
        <h1>Опишите техническую задачу до разговора</h1>
        <p className="page-lead">Чем точнее назначение, условия, количество и способ проверки, тем быстрее можно принять решение «подходит / не подходит / нужны данные».</p>
      </section>
      <section className="section-shell form-layout section-block">
        <aside>
          <p className="eyebrow">Что подготовить</p>
          <ol>
            <li>назначение изделия;</li>
            <li>файлы, фото, чертёж или образец;</li>
            <li>размеры и количество;</li>
            <li>условия и последствия отказа;</li>
            <li>желаемый срок;</li>
            <li>способ проверки.</li>
          </ol>
          <p className="small-note">Контакты мастерской и реальный SLA ещё не подтверждены, поэтому обходного канала вокруг формы нет.</p>
        </aside>
        <LeadForm />
      </section>
    </main>
  );
}
