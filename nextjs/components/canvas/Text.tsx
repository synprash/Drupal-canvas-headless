'use client';

import React from 'react';
import { BaseSDCProps } from '@/types/canvas';
import { formatDrupalHtml } from '@/lib/media';

export interface TextProps extends BaseSDCProps {
  text?: string;
  content?: string;
}

/**
 * Rich HTML Text SDC (`sdc.flexus.text`).
 */
export function Text({ text, content }: TextProps) {
  const rawBody = text || content;
  const formattedBody = rawBody ? formatDrupalHtml(rawBody) : '';

  return (
    <div
      className="text-muted-foreground leading-relaxed prose max-w-none"
      dangerouslySetInnerHTML={{ __html: formattedBody }}
    />
  );
}
