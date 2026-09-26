'use client';

import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { BaseSDCProps } from '@/types/canvas';

export interface HeroSideBySideProps extends BaseSDCProps {
  media?: { src?: string; alt?: string } | string;
  eyebrow?: string;
  heading?: string;
  heading_text?: string;
  summary?: string;
  text?: string;
  image_position?: 'left' | 'right';
}

/**
 * Hero Side-by-Side SDC Component (`sdc.flexus.hero-side-by-side`).
 * Features a split layout with headline, CTA action buttons, and media visual.
 */
export function HeroSideBySide({
  media,
  eyebrow,
  heading,
  heading_text,
  summary,
  text,
  image_position = 'right',
  renderSlot,
}: HeroSideBySideProps) {
  const title = heading_text || heading;
  const desc = text || summary;
  const hasMedia = media && (typeof media === 'string' ? media : media?.src);
  const mediaSrc = typeof media === 'string' ? media : media?.src;
  const mediaAlt = (typeof media === 'object' && media?.alt) || 'Apex Digital Hero';

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white border-b border-border">
      <div
        className={`container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          image_position === 'left' ? 'lg:flex-row-reverse' : ''
        }`}
      >
        <div className="flex flex-col gap-6">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-xs font-semibold apex-badge-gradient uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {eyebrow}
            </div>
          )}

          {renderSlot && renderSlot('hero_slot')}

          {title && !renderSlot?.('hero_slot') && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
              {title}
            </h1>
          )}
          {desc && !renderSlot?.('hero_slot') && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{desc}</p>
          )}

          {renderSlot && <div className="flex flex-wrap gap-4 pt-2">{renderSlot('actions')}</div>}
        </div>

        <div className="relative">
          {hasMedia ? (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border aspect-[16/10] bg-muted/40">
              <img
                src={mediaSrc}
                alt={mediaAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const placeholder = (e.target as HTMLElement).parentElement?.querySelector(
                    '.hero-fallback-visual'
                  );
                  if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="hero-fallback-visual hidden w-full h-full absolute inset-0 items-center justify-center p-8 text-center bg-gradient-to-tr from-primary/10 to-violet-500/10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div className="font-bold text-xl text-foreground">Apex Performance Intelligence</div>
                  <p className="text-sm text-muted-foreground max-w-xs">{mediaAlt}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-gradient-to-tr from-primary/10 to-violet-500/10 aspect-[16/10] flex items-center justify-center p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="font-bold text-xl text-foreground">Apex Growth Engine</div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Data-driven performance media and technical growth architectures.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
