import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div>
          <strong>{siteConfig.displayName}</strong>
          <p>Staging: внешняя отправка заявок и production-интеграции не подключены.</p>
        </div>
        <nav className="footer-links" aria-label="Дополнительная навигация">
          <Link href="/contacts/">Форма задачи</Link>
          <Link href="/privacy/">Обработка данных</Link>
        </nav>
      </div>
    </footer>
  );
}
