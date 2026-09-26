'use client';

import React from 'react';
import Link from 'next/link';
import { BaseSDCProps } from '@/types/canvas';
import { formatDrupalHtml } from '@/lib/media';

export interface CardPricingProps extends BaseSDCProps {
  heading_text?: string;
  title?: string;
  description?: string;
  price?: string;
  currency_symbol?: string;
  text?: string;
  button_label?: string;
  button_url?: string;
  promote?: boolean;
  isPopular?: boolean;
}

/**
 * Pricing Retainer SDC Card (`sdc.flexus.card-pricing`).
 */
export function CardPricing({
  heading_text,
  title,
  description,
  price,
  currency_symbol = '$',
  text,
  button_label = 'Get Started',
  button_url = '/contact',
  promote,
  isPopular,
}: CardPricingProps) {
  const isHighlighted = promote || isPopular;
  const planTitle = heading_text || title;
  const formattedText = text ? formatDrupalHtml(text) : '';

  return (
    <div
      className={`rounded-2xl p-8 border flex flex-col justify-between transition-all ${
        isHighlighted
          ? 'border-primary shadow-xl bg-blue-50/40 relative'
          : 'border-border bg-white shadow-sm'
      }`}
    >
      {isHighlighted && (
        <div className="self-start px-3 py-1 rounded-full text-xs font-bold apex-badge-gradient uppercase mb-4">
          Most Popular
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold text-foreground">{planTitle}</h3>
        {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
        <div className="flex items-baseline gap-1 my-6">
          <span className="text-2xl font-bold text-foreground">{currency_symbol}</span>
          <span className="text-4xl lg:text-5xl font-extrabold text-foreground">{price}</span>
          <span className="text-muted-foreground">/mo</span>
        </div>
        {formattedText && (
          <div
            className="prose prose-sm text-foreground/80 mb-8 [&>ul]:space-y-2.5 [&>ul>li]:flex [&>ul>li]:items-center [&>ul>li]:gap-2"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        )}
      </div>
      <Link
        href={button_url}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition ${
          isHighlighted
            ? 'bg-primary text-white hover:bg-primary/90 shadow-md'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {button_label}
      </Link>
    </div>
  );
}
