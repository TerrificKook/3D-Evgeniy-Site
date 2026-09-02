import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { YandexMetrika } from '@/components/yandex-metrika';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: { default: 'Нестандартные пластиковые детали для бизнеса', template: `%s — ${siteConfig.displayName}` },
  description: 'Крепления, соединители, адаптеры, корпуса, оснастка и детали по образцу — от прототипа до согласованной небольшой партии.',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Нестандартные пластиковые детали для бизнеса',
    description: 'Крепления, соединители, адаптеры, корпуса, оснастка и детали по образцу.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Нестандартные пластиковые детали для бизнеса' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нестандартные пластиковые детали для бизнеса',
    description: 'Крепления, соединители, адаптеры, корпуса, оснастка и детали по образцу.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#main-content">Перейти к содержанию</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <YandexMetrika />
      </body>
    </html>
  );
}
