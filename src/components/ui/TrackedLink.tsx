'use client';

import React from 'react';
import Link from 'next/link';
import { trackEvent } from '@/analytics/analytics';

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  eventName?: 'cta_click' | 'nav_click';
  eventMeta?: Record<string, unknown>;
  children: React.ReactNode;
}

export const TrackedLink: React.FC<TrackedLinkProps> = ({
  href,
  eventName = 'cta_click',
  eventMeta,
  onClick,
  children,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (eventName === 'cta_click') {
      trackEvent({
        name: 'cta_click',
        meta: {
          ...(eventMeta as { ctaId?: string; label?: string; sectionId?: string } | undefined),
          href,
        },
      });
    } else {
      trackEvent({
        name: 'nav_click',
        meta: {
          label: (eventMeta?.label as string) ?? '',
          href,
        },
      });
    }

    if (onClick) onClick(e);
  };

  const isExternal = href.startsWith('http') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

