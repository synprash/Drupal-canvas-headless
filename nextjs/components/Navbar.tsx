'use client';

import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * Global Responsive Navigation Header.
 * Consumes site branding and menu items dynamically from siteConfig.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl apex-badge-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-foreground">{siteConfig.name}</span>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{siteConfig.tagline}</span>
          </div>
        </Link>

        {/* Dynamic Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={siteConfig.headerCta.href}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
          >
            {siteConfig.headerCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
