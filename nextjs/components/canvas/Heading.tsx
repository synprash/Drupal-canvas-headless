'use client';

import React from 'react';
import { BaseSDCProps } from '@/types/canvas';

export interface HeadingProps extends BaseSDCProps {
  heading_text?: string;
  text?: string;
  level?: number;
  align?: 'left' | 'center' | 'right';
}

/**
 * Semantic Heading SDC (`sdc.flexus.heading`).
 */
export function Heading({ heading_text, text, level = 2, align = 'center' }: HeadingProps) {
  const content = heading_text || text;
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  const headingClasses = `font-black text-foreground tracking-tight mb-4 ${alignClass}`;

  if (level === 1) return <h1 className={`${headingClasses} text-4xl md:text-5xl`}>{content}</h1>;
  if (level === 3) return <h3 className={`${headingClasses} text-2xl md:text-3xl`}>{content}</h3>;
  if (level === 4) return <h4 className={`${headingClasses} text-xl md:text-2xl`}>{content}</h4>;
  return <h2 className={`${headingClasses} text-3xl md:text-4xl`}>{content}</h2>;
}
