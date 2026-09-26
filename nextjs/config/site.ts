/**
 * Site branding, navigation, and metadata configuration.
 * Extracted from hardcoded values for easy customization and multi-site reusability.
 */
export const siteConfig = {
  name: 'Apex Digital',
  tagline: 'Decoupled Next.js',
  description: 'Enterprise Performance Marketing & Technical Growth Agency powered by Drupal 11 and Drupal Canvas.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  /**
   * Main header navigation links.
   */
  navLinks: [
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Contact', href: '/contact' },
  ],

  /**
   * Primary call-to-action button in header.
   */
  headerCta: {
    label: 'Get Audit',
    href: '/contact',
  },

  /**
   * Footer legal & auxiliary links.
   */
  footerLinks: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Contact Us', href: '/contact' },
  ],

  /**
   * Copyright notice displayed in global footer.
   */
  copyright: `© ${new Date().getFullYear()} Apex Digital Marketing. Decoupled Next.js 15 Frontend connected to Drupal 11 & Drupal Canvas.`,
};

export type SiteConfig = typeof siteConfig;
