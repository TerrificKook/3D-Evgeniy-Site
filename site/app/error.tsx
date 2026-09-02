'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="state-page section-shell">
      <p className="eyebrow">Локальная ошибка</p>
      <h1>Страница не загрузилась</h1>
      <p>Попробуйте повторить загрузку. Черновик формы сохраняется в этом браузере.</p>
      <button className="button button-primary" type="button" onClick={reset}>Повторить</button>
    </main>
  );
}
