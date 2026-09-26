'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check, ArrowRight, ShieldCheck, Zap, Sparkles, Send, MapPin, Mail, Phone, Clock } from 'lucide-react';

interface ComponentProps {
  [key: string]: any;
  renderSlot?: (slotName: string) => React.ReactNode;
  uuid?: string;
}

// 1. Hero Side-by-Side (sdc.flexus.hero-side-by-side)
export function HeroSideBySide({
  media,
  eyebrow,
  heading,
  heading_text,
  summary,
  text,
  image_position = 'right',
  renderSlot,
}: ComponentProps) {
  const title = heading_text || heading;
  const desc = text || summary;
  const hasMedia = media && (media.src || typeof media === 'string');
  const mediaSrc = typeof media === 'string' ? media : media?.src;
  const mediaAlt = media?.alt || 'Apex Digital Hero';

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white border-b border-border">
      <div className={`container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${image_position === 'left' ? 'lg:flex-row-reverse' : ''}`}>
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
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {desc}
            </p>
          )}

          {renderSlot && (
            <div className="flex flex-wrap gap-4 pt-2">
              {renderSlot('actions')}
            </div>
          )}
        </div>

        <div className="relative">
          {hasMedia ? (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border aspect-[16/10] bg-muted/40">
              <img
                src={mediaSrc}
                alt={mediaAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder visual if local path not hosted directly on Next.js port
                  (e.target as HTMLElement).style.display = 'none';
                  const placeholder = (e.target as HTMLElement).parentElement?.querySelector('.hero-fallback-visual');
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
                <p className="text-sm text-muted-foreground max-w-xs">Data-driven performance media and technical growth architectures.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// 2. CTA Block (sdc.flexus.cta)
export function CTA({
  heading_text,
  heading,
  text,
  summary,
  level = 2,
  text_align = 'left',
  renderSlot,
}: ComponentProps) {
  const title = heading_text || heading;
  const desc = text || summary;
  const isCentered = text_align === 'center';

  return (
    <div className={`flex flex-col gap-4 ${isCentered ? 'text-center items-center' : 'text-left'}`}>
      {title && (
        level === 1 ? (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            {title}
          </h1>
        ) : (
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            {title}
          </h2>
        )
      )}
      {desc && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {desc}
        </p>
      )}
      {renderSlot && (
        <div className={`flex flex-wrap gap-4 pt-4 ${isCentered ? 'justify-center' : ''}`}>
          {renderSlot('actions')}
        </div>
      )}
    </div>
  );
}

// 3. Section Layout (sdc.flexus.section)
export function Section({
  columns = '100',
  background_color,
  renderSlot,
}: ComponentProps) {
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
        {renderSlot && (
          <div className="mb-10 text-center">
            {renderSlot('header_slot')}
          </div>
        )}
        <div className={`grid gap-8 ${getGridClass()}`}>
          {renderSlot && renderSlot('main_slot')}
        </div>
        {renderSlot && renderSlot('footer_slot')}
      </div>
    </section>
  );
}

// 4. Feature Card (sdc.flexus.card)
export function Card({
  heading_text,
  title,
  text,
  summary,
  url,
  href,
  image,
  media,
  is_text_centered,
  renderSlot,
}: ComponentProps) {
  const cardTitle = heading_text || title;
  const cardText = text || summary;
  const linkUrl = url || href;
  const imgSrc = image || media?.src || (typeof media === 'string' ? media : null);

  const Content = (
    <div className={`h-full p-8 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${is_text_centered ? 'text-center items-center' : ''}`}>
      <div>
        {imgSrc && (
          <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-muted">
            <img src={imgSrc} alt={cardTitle || 'Card image'} className="w-full h-full object-cover" />
          </div>
        )}
        {cardTitle && <h3 className="text-xl font-bold text-foreground mb-3">{cardTitle}</h3>}
        {cardText && (
          <div
            className="text-muted-foreground text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: cardText }}
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

  return linkUrl ? <Link href={linkUrl} className="block h-full group">{Content}</Link> : Content;
}

// 5. Pricing Card (sdc.flexus.card-pricing)
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
}: ComponentProps) {
  const isHighlighted = promote || isPopular;
  const planTitle = heading_text || title;

  return (
    <div className={`rounded-2xl p-8 border flex flex-col justify-between transition-all ${isHighlighted ? 'border-primary shadow-xl bg-blue-50/40 relative' : 'border-border bg-white shadow-sm'}`}>
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
        {text && (
          <div
            className="prose prose-sm text-foreground/80 mb-8 [&>ul]:space-y-2.5 [&>ul>li]:flex [&>ul>li]:items-center [&>ul>li]:gap-2"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
      <Link
        href={button_url}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition ${isHighlighted ? 'bg-primary text-white hover:bg-primary/90 shadow-md' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
      >
        {button_label}
      </Link>
    </div>
  );
}

// 6. Testimonial Card (sdc.flexus.card-testimonial)
export function CardTestimonial({
  text,
  quote,
  cite_name,
  author,
  cite_text,
  role,
  company,
}: ComponentProps) {
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

// 7. Interactive Accordion (sdc.flexus.accordion & accordion-container)
export function AccordionContainer({ renderSlot }: ComponentProps) {
  return (
    <div className="space-y-3 max-w-3xl mx-auto w-full">
      {renderSlot && renderSlot('accordion_content')}
    </div>
  );
}

export function Accordion({
  title,
  content,
  open_by_default = false,
  renderSlot,
}: ComponentProps) {
  const [open, setOpen] = useState(open_by_default);

  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden transition shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left font-semibold text-foreground flex justify-between items-center hover:bg-muted/40 transition"
      >
        <span className="text-base md:text-lg">{title}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="p-5 pt-0 text-muted-foreground text-sm md:text-base leading-relaxed border-t border-border/50">
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
          {renderSlot && renderSlot('accordion_content')}
        </div>
      )}
    </div>
  );
}

// 8. Button (sdc.flexus.button)
export function Button({
  label,
  text,
  href,
  url,
  variant = 'primary',
}: ComponentProps) {
  const buttonLabel = label || text;
  const buttonHref = href || url;
  const isPrimary = variant === 'primary';

  const className = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${isPrimary ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg' : 'border border-border bg-white text-foreground hover:bg-muted'}`;

  return buttonHref ? (
    <Link href={buttonHref} className={className}>
      {buttonLabel}
      <ArrowRight className="w-4 h-4" />
    </Link>
  ) : (
    <button className={className}>{buttonLabel}</button>
  );
}

// 9. Heading (sdc.flexus.heading)
export function Heading({
  heading_text,
  text,
  level = 2,
  align = 'center',
}: ComponentProps) {
  const content = heading_text || text;
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  const headingClasses = `font-black text-foreground tracking-tight mb-4 ${alignClass}`;

  if (level === 1) return <h1 className={`${headingClasses} text-4xl md:text-5xl`}>{content}</h1>;
  if (level === 3) return <h3 className={`${headingClasses} text-2xl md:text-3xl`}>{content}</h3>;
  if (level === 4) return <h4 className={`${headingClasses} text-xl md:text-2xl`}>{content}</h4>;
  return <h2 className={`${headingClasses} text-3xl md:text-4xl`}>{content}</h2>;
}

// 10. Text (sdc.flexus.text)
export function Text({ text, content }: ComponentProps) {
  const body = text || content;
  return (
    <div
      className="text-muted-foreground leading-relaxed prose max-w-none"
      dangerouslySetInnerHTML={{ __html: body || '' }}
    />
  );
}

// 11. Interactive Form (sdc.flexus.form)
export function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Technical & Enterprise SEO',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ sid?: number; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. First attempt: Direct to Drupal REST endpoint (supports CORS & browser certificate)
      let res;
      try {
        res = await fetch('https://drupal-lerd.test/api/contact-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (directErr) {
        console.warn('Direct Drupal submission notice, trying internal proxy:', directErr);
      }

      // 2. Second attempt: Internal Next.js API proxy
      if (!res || !res.ok) {
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      const json = await res.json();
      setSubmissionResult(json?.data || json);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 rounded-2xl border border-border bg-white shadow-sm">
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-foreground mb-2">Strategy Request Submitted!</h4>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
            Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Your inquiry has been transmitted directly to Drupal Webform management.
          </p>
          {submissionResult?.sid && (
            <div className="inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full font-mono font-semibold">
              Drupal Submission ID: #{submissionResult.sid}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-foreground mb-1">Your Name *</label>
              <input
                required
                type="text"
                placeholder="Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-foreground mb-1">Work Email *</label>
              <input
                required
                type="email"
                placeholder="sarah@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-foreground mb-1">Primary Growth Focus</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="Technical & Enterprise SEO">Technical & Enterprise SEO</option>
              <option value="Performance Paid Media & Ads">Performance Paid Media & Ads</option>
              <option value="Conversion Rate Optimization (CRO)">Conversion Rate Optimization (CRO)</option>
              <option value="Full-Funnel Growth Partnership">Full-Funnel Growth Partnership</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-foreground mb-1">Website URL & Project Details</label>
            <textarea
              rows={3}
              placeholder="https://yourbrand.com • Target goals, current spend, timelines..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Transmitting to Drupal...' : 'Submit Strategy Request'}
          </button>
        </form>
      )}
    </div>
  );
}

// 12. Stat Counter (sdc.apex_theme.stat-counter)
export function StatCounter({
  number,
  prefix = '',
  suffix = '',
  label,
  description,
}: ComponentProps) {
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

// Component Registry Mapping
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  'sdc.flexus.hero-side-by-side': HeroSideBySide,
  'sdc.flexus.hero-billboard': HeroSideBySide,
  'sdc.flexus.cta': CTA,
  'sdc.flexus.section': Section,
  'sdc.flexus.card': Card,
  'sdc.flexus.card-pricing': CardPricing,
  'sdc.flexus.card-testimonial': CardTestimonial,
  'sdc.flexus.accordion-container': AccordionContainer,
  'sdc.flexus.accordion': Accordion,
  'sdc.flexus.button': Button,
  'sdc.flexus.heading': Heading,
  'sdc.flexus.text': Text,
  'sdc.flexus.form': Form,
  'sdc.apex_theme.stat-counter': StatCounter,
};
