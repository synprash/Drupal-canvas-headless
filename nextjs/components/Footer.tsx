import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

/**
 * Global Footer Component.
 * Consumes legal links and copyright info dynamically from siteConfig.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-muted-foreground text-center md:text-left">
          {siteConfig.copyright}
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          {siteConfig.footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline transition">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
