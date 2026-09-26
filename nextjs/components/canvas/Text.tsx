'use client';

import React from 'react';
import { BaseSDCProps } from '@/types/canvas';

export interface TextProps extends BaseSDCProps {
  text?: string;
  content?: string;
}

/**
 * Rich HTML Text SDC (`sdc.flexus.text`).
 */
export function Text({ text, content }: TextProps) {
  const body = text || content;
  return (
    <div
      className="text-muted-foreground leading-relaxed prose max-w-none"
      dangerouslySetInnerHTML={{ __html: body || '' }}
    />
  );
}
