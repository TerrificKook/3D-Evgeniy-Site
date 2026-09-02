import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
import { siteConfig } from '@/config/site';

const navigation = [
  { href: '/#tasks', label: 'Задачи' },
  { href: '/#case', label: 'Кейс' },
  { href: '/#production', label: 'Производство' },
  { href: '/#order', label: 'Как заказать' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <Link className="brand" href="/" aria-label={`${siteConfig.displayName} — на главную`}>
          <span>{siteConfig.brand.primary}</span>
          <span className="brand-divider" aria-hidden="true">/</span>
          <span>{siteConfig.brand.secondary}</span>
        </Link>
        <nav className="site-nav site-nav-desktop" aria-label="Основная навигация">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link className="button button-primary button-small" href="/#contact">
            Оценить задачу <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Открыть меню"><Menu aria-hidden="true" size={22} /></summary>
          <nav aria-label="Мобильная навигация">
            {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link className="button button-primary" href="/#contact">Оценить задачу</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
