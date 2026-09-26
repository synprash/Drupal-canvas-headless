'use client';

import React from 'react';
import { BaseSDCProps } from '@/types/canvas';

export interface CardTestimonialProps extends BaseSDCProps {
  text?: string;
  quote?: string;
  cite_name?: string;
  author?: string;
  cite_text?: string;
  role?: string;
  company?: string;
}

/**
 * Testimonial Review SDC Card (`sdc.flexus.card-testimonial`).
 */
export function CardTestimonial({
  text,
  quote,
  cite_name,
  author,
  cite_text,
  role,
  company,
}: CardTestimonialProps) {
  const testimonialText = text || quote;
  const authorName = cite_name || author;
  const authorSub = cite_text || (role ? `${role} • ${company}` : company);

  return (
    <div className="p-8 rounded-2xl border border-border bg-white shadow-sm flex flex-col justify-between">
      <blockquote className="text-foreground text-lg italic leading-relaxed mb-6">
        "{testimonialText}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
          {authorName?.[0] || 'A'}
        </div>
        <div>
          <div className="font-bold text-foreground text-sm">{authorName}</div>
          {authorSub && <div className="text-xs text-muted-foreground">{authorSub}</div>}
        </div>
      </div>
    </div>
  );
}
