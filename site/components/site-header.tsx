import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <Link className="brand" href="/" aria-label="Инженерная мастерская — на главную">
          <span className="brand-mark" aria-hidden="true">ЕМ</span>
          <span className="brand-label">Инженерная мастерская</span>
        </Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <Link href="/cases/">Кейсы</Link>
          <Link href="/vozmozhnosti-i-ogranicheniya/">Ограничения</Link>
          <Link href="/quality-and-acceptance/">Контроль</Link>
          <Link className="button button-primary button-small" href="/contacts/">Прислать задачу</Link>
        </nav>
      </div>
    </header>
  );
}
