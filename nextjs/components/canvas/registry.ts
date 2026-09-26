import React from 'react';
import { HeroSideBySide } from './HeroSideBySide';
import { CTA } from './CTA';
import { Section } from './Section';
import { Card } from './Card';
import { CardPricing } from './CardPricing';
import { CardTestimonial } from './CardTestimonial';
import { Accordion, AccordionContainer } from './Accordion';
import { Button } from './Button';
import { Heading } from './Heading';
import { Text } from './Text';
import { Form } from './Form';
import { StatCounter } from './StatCounter';

/**
 * Single Directory Component (SDC) React Component Registry.
 * Maps Drupal SDC machine identifiers to their modular React Server/Client Component implementations.
 */
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  // Hero Components
  'sdc.flexus.hero-side-by-side': HeroSideBySide,
  'sdc.flexus.hero-billboard': HeroSideBySide,
  'sdc.flexus.hero-blog': HeroSideBySide,

  // Section & Layout
  'sdc.flexus.section': Section,

  // Call to Action
  'sdc.flexus.cta': CTA,

  // Cards & Teasers
  'sdc.flexus.card': Card,
  'sdc.flexus.card-pricing': CardPricing,
  'sdc.flexus.card-testimonial': CardTestimonial,

  // Accordions
  'sdc.flexus.accordion-container': AccordionContainer,
  'sdc.flexus.accordion': Accordion,

  // Typography & Elements
  'sdc.flexus.button': Button,
  'sdc.flexus.heading': Heading,
  'sdc.flexus.text': Text,

  // Webform
  'sdc.flexus.form': Form,

  // Child Theme SDC (apex_theme)
  'sdc.apex_theme.stat-counter': StatCounter,
};

// Export individual components for direct consumption
export {
  HeroSideBySide,
  CTA,
  Section,
  Card,
  CardPricing,
  CardTestimonial,
  Accordion,
  AccordionContainer,
  Button,
  Heading,
  Text,
  Form,
  StatCounter,
};
