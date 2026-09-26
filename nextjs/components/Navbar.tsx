import React from 'react';
import Link from 'next/link';
import { Zap, Sparkles } from 'lucide-react';

export function Navbar() {
  const links = [
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl apex-badge-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-foreground">Apex Digital</span>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Decoupled Next.js</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
          >
            Get Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
