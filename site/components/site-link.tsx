import type { ComponentProps } from 'react';
import Link from 'next/link';
import { isGitHubPages, withBasePath } from '@/config/site';

type SiteLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string };

export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  if (isGitHubPages) {
    return <a href={withBasePath(href)} {...props}>{children}</a>;
  }

  return <Link href={href} {...props}>{children}</Link>;
}
