import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { YandexMetrika } from '@/components/yandex-metrika';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: { default: 'Функциональные пластиковые детали и корпуса', template: `%s — ${siteConfig.displayName}` },
  description: 'Квалификация деталей по образцу, корпусов электроники и производственной оснастки: инженерная подготовка, пилот и повторяемая версия.',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Функциональные пластиковые детали и корпуса',
    description: 'Квалификация задачи, платный пилот и повторяемая версия после проверки.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Функциональные пластиковые детали и корпуса' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Функциональные пластиковые детали и корпуса',
    description: 'Квалификация задачи, платный пилот и повторяемая версия после проверки.',
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
