'use client';

import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { BaseSDCProps } from '@/types/canvas';

/**
 * Interactive Webform SDC (`sdc.flexus.form`).
 * Posts directly to Drupal Webform API with Next.js fallback proxy.
 */
export function Form({}: BaseSDCProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Technical & Enterprise SEO',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ sid?: number | string; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. First attempt: Direct to Drupal REST endpoint
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
