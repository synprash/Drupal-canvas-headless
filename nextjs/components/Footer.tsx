import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-muted-foreground">
          © 2026 Apex Digital Marketing (Decoupled Next.js Frontend). Powered by Drupal 11 & Drupal Canvas.
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
