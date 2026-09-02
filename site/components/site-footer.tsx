import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  const contacts = [
    { label: 'Telegram', value: siteConfig.contacts.telegram, href: siteConfig.contacts.telegram },
    { label: 'WhatsApp', value: siteConfig.contacts.whatsapp, href: siteConfig.contacts.whatsapp },
    { label: 'Телефон', value: siteConfig.contacts.phone, href: siteConfig.contacts.phone ? 'tel:' + String(siteConfig.contacts.phone) : '' },
    { label: 'Email', value: siteConfig.contacts.email, href: siteConfig.contacts.email ? 'mailto:' + String(siteConfig.contacts.email) : '' },
  ].filter((item) => item.value && item.href);

  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div>
          <strong>{siteConfig.brand.primary} / {siteConfig.brand.secondary}</strong>
          <p>Нестандартные пластиковые детали для бизнеса и производства.</p>
        </div>
        <nav className="footer-links" aria-label="Дополнительная навигация">
          {contacts.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          <Link href="/privacy/">Обработка данных</Link>
        </nav>
      </div>
    </footer>
  );
}
