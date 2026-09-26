'use client';

import React from 'react';
import { BaseSDCProps } from '@/types/canvas';

export interface CTAProps extends BaseSDCProps {
  heading_text?: string;
  heading?: string;
  text?: string;
  summary?: string;
  level?: number;
  text_align?: 'left' | 'center' | 'right';
}

/**
 * Call To Action SDC Component (`sdc.flexus.cta`).
 * Renders prominent headings, copy, and action button slots.
 */
export function CTA({
  heading_text,
  heading,
  text,
  summary,
  level = 2,
  text_align = 'left',
  renderSlot,
}: CTAProps) {
  const title = heading_text || heading;
  const desc = text || summary;
  const isCentered = text_align === 'center';

  return (
    <div className={`flex flex-col gap-4 ${isCentered ? 'text-center items-center' : 'text-left'}`}>
      {title &&
        (level === 1 ? (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            {title}
          </h1>
        ) : (
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{title}</h2>
        ))}
      {desc && <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">{desc}</p>}
      {renderSlot && (
        <div className={`flex flex-wrap gap-4 pt-4 ${isCentered ? 'justify-center' : ''}`}>
          {renderSlot('actions')}
        </div>
      )}
    </div>
  );
}
