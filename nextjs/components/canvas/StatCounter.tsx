'use client';

import React from 'react';
import { BaseSDCProps } from '@/types/canvas';

export interface StatCounterProps extends BaseSDCProps {
  number: string;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
}

/**
 * Animated Stat Counter SDC (`sdc.apex_theme.stat-counter`).
 * Custom SDC from apex_theme child theme.
 */
export function StatCounter({
  number,
  prefix = '',
  suffix = '',
  label,
  description,
}: StatCounterProps) {
  return (
    <div className="apex-glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2">
      <div className="flex items-baseline font-black text-4xl lg:text-5xl text-primary tracking-tight">
        {prefix && <span className="text-3xl lg:text-4xl text-primary/80 me-0.5">{prefix}</span>}
        <span>{number}</span>
        {suffix && <span className="text-3xl lg:text-4xl text-primary/80 ms-0.5">{suffix}</span>}
      </div>
      <div className="font-bold text-lg text-foreground mt-1">{label}</div>
      {description && <div className="text-sm text-muted-foreground">{description}</div>}
    </div>
  );
}
