'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BaseSDCProps } from '@/types/canvas';
import { formatDrupalHtml } from '@/lib/media';

export interface AccordionProps extends BaseSDCProps {
  title?: string;
  content?: string;
  open_by_default?: boolean;
}

/**
 * Interactive Accordion Container (`sdc.flexus.accordion-container`).
 */
export function AccordionContainer({ renderSlot }: BaseSDCProps) {
  return <div className="space-y-3 max-w-3xl mx-auto w-full">{renderSlot && renderSlot('accordion_content')}</div>;
}

/**
 * Single Accordion Item (`sdc.flexus.accordion`).
 */
export function Accordion({ title, content, open_by_default = false, renderSlot }: AccordionProps) {
  const [open, setOpen] = useState(open_by_default);
  const formattedContent = content ? formatDrupalHtml(content) : '';

  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden transition shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left font-semibold text-foreground flex justify-between items-center hover:bg-muted/40 transition cursor-pointer"
      >
        <span className="text-base md:text-lg">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="p-5 pt-0 text-muted-foreground text-sm md:text-base leading-relaxed border-t border-border/50">
          {formattedContent && <div dangerouslySetInnerHTML={{ __html: formattedContent }} />}
          {renderSlot && renderSlot('accordion_content')}
        </div>
      )}
    </div>
  );
}
