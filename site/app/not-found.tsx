import { SiteLink } from '@/components/site-link';

export default function NotFound() {
  return (
    <main className="state-page section-shell">
      <p className="eyebrow">Ошибка 404</p>
      <h1>Такой страницы нет</h1>
      <p>Вернитесь к трём типам задач или откройте квалификационную форму.</p>
      <div className="hero-actions">
        <SiteLink className="button button-primary" href="/">На главную</SiteLink>
        <SiteLink className="text-link" href="/contacts/">Описать задачу</SiteLink>
      </div>
    </main>
  );
}
