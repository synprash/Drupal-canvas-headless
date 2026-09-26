'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface ComponentProps {
  [key: string]: any;
  renderSlot?: (slotName: string) => React.ReactNode;
  uuid?: string;
}

// 1. Hero Side-by-Side
export function HeroSideBySide({ eyebrow, heading, summary, renderSlot }: ComponentProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/50 to-white border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-xs font-semibold apex-badge-gradient uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            {heading}
          </h1>
          {summary && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {summary}
            </p>
          )}
          {renderSlot && (
            <div className="flex flex-wrap gap-4 pt-2">
              {renderSlot('actions')}
            </div>
          )}
        </div>
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-muted/40 aspect-[16/10] flex items-center justify-center p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="w-8 h-8" />
              </div>
              <div className="font-bold text-xl text-foreground">Growth Intelligence Engine</div>
              <p className="text-sm text-muted-foreground max-w-xs">Live interactive decoupled preview rendering Drupal Canvas component trees.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. Section Layout (Columns)
export function Section({ columns = '100', renderSlot }: ComponentProps) {
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

  return (
    <section className="py-12 md:py-16 container mx-auto px-4 max-w-6xl">
      {renderSlot && renderSlot('header_slot')}
      <div className={`grid gap-8 ${getGridClass()}`}>
        {renderSlot && renderSlot('main_slot')}
      </div>
      {renderSlot && renderSlot('footer_slot')}
    </section>
  );
}

// 3. Stat Counter (Child Theme SDC)
export function StatCounter({ number, prefix = '+', suffix = '%', label, description }: ComponentProps) {
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

// 4. Feature Card
export function Card({ title, summary, href, renderSlot }: ComponentProps) {
  const Content = (
    <div className="h-full p-6 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{summary}</p>
      </div>
      {href && (
        <div className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
          Learn more <ArrowRight className="w-4 h-4" />
        </div>
      )}
      {renderSlot && renderSlot('actions')}
    </div>
  );

  return href ? <Link href={href} className="block h-full">{Content}</Link> : Content;
}

// 5. Pricing Card
export function CardPricing({ title, price, period = '/mo', badge, features = [], isPopular, href = '/contact' }: ComponentProps) {
  return (
    <div className={`rounded-2xl p-8 border flex flex-col justify-between transition-all ${isPopular ? 'border-primary shadow-xl bg-blue-50/30 relative' : 'border-border bg-white shadow-sm'}`}>
      {badge && (
        <div className="self-start px-3 py-1 rounded-full text-xs font-bold apex-badge-gradient uppercase mb-4">
          {badge}
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <div className="flex items-baseline gap-1 my-6">
          <span className="text-4xl lg:text-5xl font-extrabold text-foreground">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {Array.isArray(features) && features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="w-4 h-4 text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Link href={href} className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition ${isPopular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-secondary text-white hover:bg-secondary/90'}`}>
        Get Started
      </Link>
    </div>
  );
}

// 6. Testimonial Card
export function CardTestimonial({ quote, author, role, company }: ComponentProps) {
  return (
    <div className="p-8 rounded-2xl border border-border bg-white shadow-sm flex flex-col justify-between">
      <blockquote className="text-foreground text-lg italic mb-6">"{quote}"</blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
          {author?.[0]}
        </div>
        <div>
          <div className="font-bold text-foreground text-sm">{author}</div>
          <div className="text-xs text-muted-foreground">{role} • {company}</div>
        </div>
      </div>
    </div>
  );
}

// 7. Accordion & Container
export function AccordionContainer({ renderSlot }: ComponentProps) {
  return <div className="space-y-3 max-w-3xl mx-auto w-full">{renderSlot && renderSlot('accordion_content')}</div>;
}

export function Accordion({ title, content }: ComponentProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden transition">
      <button onClick={() => setOpen(!open)} className="w-full p-5 text-left font-semibold text-foreground flex justify-between items-center hover:bg-muted/50">
        <span>{title}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="p-5 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/50">{content}</div>}
    </div>
  );
}

// 8. Button
export function Button({ text, href, variant = 'primary' }: ComponentProps) {
  const isPrimary = variant === 'primary';
  const className = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${isPrimary ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg' : 'border border-border bg-white text-foreground hover:bg-muted'}`;
  return href ? <Link href={href} className={className}>{text}</Link> : <button className={className}>{text}</button>;
}

// 9. Heading & Text
export function Heading({ heading_text, level = 2 }: ComponentProps) {
  const headingClasses = "text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-4";
  if (level === 1) return <h1 className={headingClasses}>{heading_text}</h1>;
  if (level === 3) return <h3 className={headingClasses}>{heading_text}</h3>;
  if (level === 4) return <h4 className={headingClasses}>{heading_text}</h4>;
  return <h2 className={headingClasses}>{heading_text}</h2>;
}

export function Text({ text }: ComponentProps) {
  return <div className="text-muted-foreground leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: text || '' }} />;
}

// 10. CTA Block
export function CTA({ heading, summary, renderSlot }: ComponentProps) {
  return (
    <section className="my-16 rounded-3xl p-10 md:p-16 text-center apex-badge-gradient text-white shadow-2xl flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold max-w-2xl mb-4">{heading}</h2>
      <p className="text-blue-100 text-lg max-w-xl mb-8">{summary}</p>
      {renderSlot && <div className="flex gap-4">{renderSlot('actions')}</div>}
    </section>
  );
}

// Component Registry Mapping
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  'sdc.flexus.hero-side-by-side': HeroSideBySide,
  'sdc.flexus.section': Section,
  'sdc.flexus.card': Card,
  'sdc.flexus.card-pricing': CardPricing,
  'sdc.flexus.card-testimonial': CardTestimonial,
  'sdc.flexus.accordion-container': AccordionContainer,
  'sdc.flexus.accordion': Accordion,
  'sdc.flexus.button': Button,
  'sdc.flexus.heading': Heading,
  'sdc.flexus.text': Text,
  'sdc.flexus.cta': CTA,
  'sdc.apex_theme.stat-counter': StatCounter,
};
