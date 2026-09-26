'use client';

import React from 'react';
import { BaseSDCProps } from '@/types/canvas';

export interface SectionProps extends BaseSDCProps {
  columns?: '100' | '50-50' | '33-33-33' | '25-25-25-25';
  background_color?: 'default' | 'muted';
}

/**
 * Grid Section SDC Layout (`sdc.flexus.section`).
 * Implements a responsive multi-column layout with header_slot, main_slot, and footer_slot.
 */
export function Section({ columns = '100', background_color, renderSlot }: SectionProps) {
  const getGridClass = () => {
    switch (columns) {
      case '50-50':
        return 'grid-cols-1 md:grid-cols-2';
      case '33-33-33':
        return 'grid-cols-1 md:grid-cols-3';
      case '25-25-25-25':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };

  const bgClass = background_color === 'muted' ? 'bg-slate-50/80 border-y border-border' : '';

  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {renderSlot && <div className="mb-10 text-center">{renderSlot('header_slot')}</div>}
        <div className={`grid gap-8 ${getGridClass()}`}>{renderSlot && renderSlot('main_slot')}</div>
        {renderSlot && renderSlot('footer_slot')}
      </div>
    </section>
  );
}
