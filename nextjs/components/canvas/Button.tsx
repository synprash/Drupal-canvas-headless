'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BaseSDCProps } from '@/types/canvas';
import { resolveDrupalMediaUrl } from '@/lib/media';

export interface ButtonProps extends BaseSDCProps {
  label?: string;
  text?: string;
  href?: string;
  url?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * Action Button / Link SDC (`sdc.flexus.button`).
 */
export function Button({ label, text, href, url, variant = 'primary' }: ButtonProps) {
  const buttonLabel = label || text;
  const rawHref = href || url;
  const isPrimary = variant === 'primary';

  const className = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
    isPrimary
      ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
      : 'border border-border bg-white text-foreground hover:bg-muted'
  }`;

  if (!rawHref) {
    return (
      <button type="button" className={className}>
        {buttonLabel}
      </button>
    );
  }

  const isDrupalFile = rawHref.startsWith('/sites/') || /\.(pdf|zip|docx?|xlsx?|csv|png|jpe?g|webp)$/i.test(rawHref);
  const isExternal = rawHref.startsWith('http://') || rawHref.startsWith('https://') || isDrupalFile;
  const resolvedHref = isDrupalFile ? resolveDrupalMediaUrl(rawHref) : rawHref;

  if (isExternal) {
    return (
      <a
        href={resolvedHref}
        target={isDrupalFile || isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {buttonLabel}
        <ArrowRight className="w-4 h-4" />
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={className}>
      {buttonLabel}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
