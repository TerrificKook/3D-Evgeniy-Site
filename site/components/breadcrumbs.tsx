import { SiteLink } from '@/components/site-link';

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <SiteLink href="/">Главная</SiteLink>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
