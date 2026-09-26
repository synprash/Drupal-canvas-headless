'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BaseSDCProps } from '@/types/canvas';

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
  const buttonHref = href || url;
  const isPrimary = variant === 'primary';

  const className = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
    isPrimary
      ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
      : 'border border-border bg-white text-foreground hover:bg-muted'
  }`;

  return buttonHref ? (
    <Link href={buttonHref} className={className}>
      {buttonLabel}
      <ArrowRight className="w-4 h-4" />
    </Link>
  ) : (
    <button type="button" className={className}>
      {buttonLabel}
    </button>
  );
}
