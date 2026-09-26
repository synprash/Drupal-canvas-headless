'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BaseSDCProps } from '@/types/canvas';
import { resolveDrupalMediaUrl, formatDrupalHtml } from '@/lib/media';

export interface CardProps extends BaseSDCProps {
  heading_text?: string;
  title?: string;
  text?: string;
  summary?: string;
  url?: string;
  href?: string;
  image?: string;
  image_url?: string;
  media?: { src?: string; alt?: string; url?: string } | string;
  is_text_centered?: boolean;
}

/**
 * Feature / Case Spotlight SDC Card (`sdc.flexus.card`).
 */
export function Card({
  heading_text,
  title,
  text,
  summary,
  url,
  href,
  image,
  image_url,
  media,
  is_text_centered,
  renderSlot,
}: CardProps) {
  const cardTitle = heading_text || title;
  const rawText = text || summary;
  const formattedHtml = rawText ? formatDrupalHtml(rawText) : '';
  const linkUrl = url || href;
  const rawImg = image || image_url || media;
  const imgSrc = resolveDrupalMediaUrl(rawImg);

  const Content = (
    <div
      className={`h-full p-8 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        is_text_centered ? 'text-center items-center' : ''
      }`}
    >
      <div>
        {imgSrc && (
          <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-muted">
            <img src={imgSrc} alt={cardTitle || 'Card image'} className="w-full h-full object-cover" />
          </div>
        )}
        {cardTitle && <h3 className="text-xl font-bold text-foreground mb-3">{cardTitle}</h3>}
        {formattedHtml && (
          <div
            className="text-muted-foreground text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedHtml }}
          />
        )}
      </div>
      {linkUrl && (
        <div className="mt-6 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
          Learn more <ArrowRight className="w-4 h-4" />
        </div>
      )}
      {renderSlot && renderSlot('actions')}
    </div>
  );

  return linkUrl ? (
    <Link href={linkUrl} className="block h-full group">
      {Content}
    </Link>
  ) : (
    Content
  );
}
