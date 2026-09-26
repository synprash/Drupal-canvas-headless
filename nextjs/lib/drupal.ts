import https from 'node:https';
import http from 'node:http';
import dns from 'node:dns';

// Allow local .test SSL certificates in development
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const DRUPAL_BASE_URL = process.env.DRUPAL_BASE_URL || 'https://drupal-lerd.test';

export interface CanvasComponentNode {
  uuid: string;
  component_id: string;
  inputs: Record<string, any>;
  parent_uuid?: string | null;
  slot?: string | null;
}

export interface CanvasPageData {
  id: string;
  title: string;
  path: string;
  component_tree: Record<string, CanvasComponentNode>;
}

// Custom request function ensuring .test domains resolve to 127.0.0.1
function fetchFromDrupal(endpoint: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(endpoint, DRUPAL_BASE_URL);
      const isHttps = url.protocol === 'https:';
      const lib = isHttps ? https : http;

      const options: https.RequestOptions = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'Host': url.hostname,
          'Accept': 'application/vnd.api+json, application/json',
          'User-Agent': 'Apex-NextJS-Client/1.0',
        },
        rejectUnauthorized: false,
        lookup: (hostname, opts, callback) => {
          if (typeof opts === 'function') {
            callback = opts;
            opts = {};
          }
          if (hostname.endsWith('.test') || hostname === 'drupal-lerd.test') {
            return callback(null, '127.0.0.1', 4);
          }
          return dns.lookup(hostname, opts, callback);
        },
      };

      const req = lib.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(new Error(`JSON parse error: ${e}`));
            }
          } else {
            reject(new Error(`Drupal returned HTTP ${res.statusCode}: ${res.statusMessage}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.setTimeout(5000, () => {
        req.destroy(new Error('Request to Drupal timed out (5000ms)'));
      });

      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

// Fallback Canvas Component Trees for complete offline/decoupled resilience
const FALLBACK_PAGES: Record<string, CanvasPageData> = {
  '/': {
    id: 'canvas-home',
    title: 'Home',
    path: '/',
    component_tree: {
      'hero-1': {
        uuid: 'hero-1',
        component_id: 'sdc.flexus.hero-side-by-side',
        inputs: {
          eyebrow: 'Leading Digital Marketing Agency',
          heading: 'Engineered for Hyper-Growth & Market Leadership',
          summary: 'We combine predictive AI analytics, enterprise full-funnel CRO, and precision performance media to scale ambitious B2B & direct-to-consumer brands.',
        },
        parent_uuid: null,
        slot: null,
      },
      'btn-1': {
        uuid: 'btn-1',
        component_id: 'sdc.flexus.button',
        inputs: { text: 'Claim Growth Audit', href: '/contact', variant: 'primary' },
        parent_uuid: 'hero-1',
        slot: 'actions',
      },
      'btn-2': {
        uuid: 'btn-2',
        component_id: 'sdc.flexus.button',
        inputs: { text: 'Explore Services', href: '/services', variant: 'secondary' },
        parent_uuid: 'hero-1',
        slot: 'actions',
      },
      'stats-section': {
        uuid: 'stats-section',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '25-25-25-25' },
        parent_uuid: null,
        slot: null,
      },
      'stat-1': {
        uuid: 'stat-1',
        component_id: 'sdc.apex_theme.stat-counter',
        inputs: { prefix: '$', number: '140M+', label: 'Client Revenue Generated', description: 'Across enterprise search & paid media' },
        parent_uuid: 'stats-section',
        slot: 'main_slot',
      },
      'stat-2': {
        uuid: 'stat-2',
        component_id: 'sdc.apex_theme.stat-counter',
        inputs: { prefix: '+', number: '340%', label: 'Avg ROAS Increase', description: 'Over baseline in first 90 days' },
        parent_uuid: 'stats-section',
        slot: 'main_slot',
      },
      'stat-3': {
        uuid: 'stat-3',
        component_id: 'sdc.apex_theme.stat-counter',
        inputs: { prefix: '', number: '99.4%', label: 'Client Retention Rate', description: 'Industry benchmark performance' },
        parent_uuid: 'stats-section',
        slot: 'main_slot',
      },
      'stat-4': {
        uuid: 'stat-4',
        component_id: 'sdc.apex_theme.stat-counter',
        inputs: { prefix: '', number: '45+', label: 'Global Industry Awards', description: 'Search, CRO & Design accolades' },
        parent_uuid: 'stats-section',
        slot: 'main_slot',
      },
      'services-section': {
        uuid: 'services-section',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '33-33-33' },
        parent_uuid: null,
        slot: null,
      },
      'card-1': {
        uuid: 'card-1',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Technical & Generative SEO',
          summary: 'Dominate organic search with structured semantic architecture, programmatic landing pages, and AI engine optimization.',
          href: '/services',
        },
        parent_uuid: 'services-section',
        slot: 'main_slot',
      },
      'card-2': {
        uuid: 'card-2',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Performance Paid Media',
          summary: 'Algorithmic multi-channel paid acquisition across Google Ads, Meta, LinkedIn, and programmatic DSP networks.',
          href: '/services',
        },
        parent_uuid: 'services-section',
        slot: 'main_slot',
      },
      'card-3': {
        uuid: 'card-3',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Conversion Rate Optimization (CRO)',
          summary: 'Turn traffic into compounding revenue through rapid multivariate experimentation, friction auditing, and heatmap analysis.',
          href: '/services',
        },
        parent_uuid: 'services-section',
        slot: 'main_slot',
      },
      'cta-home': {
        uuid: 'cta-home',
        component_id: 'sdc.flexus.cta',
        inputs: {
          heading: 'Ready to Accelerate Your Customer Acquisition?',
          summary: 'Partner with Apex Digital to transform your digital presence into a scalable revenue pipeline.',
        },
        parent_uuid: null,
        slot: null,
      },
      'cta-btn': {
        uuid: 'cta-btn',
        component_id: 'sdc.flexus.button',
        inputs: { text: 'Schedule Strategy Session', href: '/contact', variant: 'primary' },
        parent_uuid: 'cta-home',
        slot: 'actions',
      },
    },
  },
  '/services': {
    id: 'canvas-services',
    title: 'Services',
    path: '/services',
    component_tree: {
      'hero-services': {
        uuid: 'hero-services',
        component_id: 'sdc.flexus.hero-side-by-side',
        inputs: {
          eyebrow: 'Full-Funnel Capabilities',
          heading: 'Growth Disciplines Designed for Market Dominance',
          summary: 'From deep technical SEO and search visibility to high-velocity conversion testing and precision paid campaigns.',
        },
        parent_uuid: null,
        slot: null,
      },
      'grid-services': {
        uuid: 'grid-services',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '50-50' },
        parent_uuid: null,
        slot: null,
      },
      'svc-1': {
        uuid: 'svc-1',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Enterprise Technical SEO',
          summary: 'Core Web Vitals tuning, crawl budget optimization, faceted navigation engineering, and rich schema markup.',
          href: '/contact',
        },
        parent_uuid: 'grid-services',
        slot: 'main_slot',
      },
      'svc-2': {
        uuid: 'svc-2',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Omnichannel Paid Media & Social',
          summary: 'Hyper-targeted bidding algorithms, creative sprint testing, lookalike modeling, and attribution modeling.',
          href: '/contact',
        },
        parent_uuid: 'grid-services',
        slot: 'main_slot',
      },
      'svc-3': {
        uuid: 'svc-3',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Scientific Conversion Rate Optimization',
          summary: 'Statistical A/B and multivariate tests, behavioral click tracking, checkout funnel streamlining, and qualitative research.',
          href: '/contact',
        },
        parent_uuid: 'grid-services',
        slot: 'main_slot',
      },
      'svc-4': {
        uuid: 'svc-4',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Strategic Content Marketing & PR',
          summary: 'High-authority digital PR, link earning, thought leadership publishing, and content hub architecture.',
          href: '/contact',
        },
        parent_uuid: 'grid-services',
        slot: 'main_slot',
      },
      'faq-section': {
        uuid: 'faq-section',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '100' },
        parent_uuid: null,
        slot: null,
      },
      'faq-container': {
        uuid: 'faq-container',
        component_id: 'sdc.flexus.accordion-container',
        inputs: {},
        parent_uuid: 'faq-section',
        slot: 'main_slot',
      },
      'faq-1': {
        uuid: 'faq-1',
        component_id: 'sdc.flexus.accordion',
        inputs: {
          title: 'How quickly do we see results from campaigns?',
          content: 'Paid media channels demonstrate positive ROAS lift within 14 to 30 days. Organic technical SEO and content compounding generally yield significant market share gains between months 2 and 6.',
        },
        parent_uuid: 'faq-container',
        slot: 'accordion_content',
      },
      'faq-2': {
        uuid: 'faq-2',
        component_id: 'sdc.flexus.accordion',
        inputs: {
          title: 'Do you offer dedicated account pods?',
          content: 'Yes. Every client is paired with a dedicated Growth Pod comprising a Senior Strategist, Technical Lead, Creative Producer, and Data Analyst.',
        },
        parent_uuid: 'faq-container',
        slot: 'accordion_content',
      },
    },
  },
  '/about': {
    id: 'canvas-about',
    title: 'About Us',
    path: '/about',
    component_tree: {
      'hero-about': {
        uuid: 'hero-about',
        component_id: 'sdc.flexus.hero-side-by-side',
        inputs: {
          eyebrow: 'Our Vision & Methodology',
          heading: 'We Build Unfair Advantages for Category Leaders',
          summary: 'Apex Digital was founded on a simple truth: sustainable growth is engineered through empirical data, exceptional creative talent, and relentless experimentation.',
        },
        parent_uuid: null,
        slot: null,
      },
      'values-section': {
        uuid: 'values-section',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '33-33-33' },
        parent_uuid: null,
        slot: null,
      },
      'val-1': {
        uuid: 'val-1',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Empirical Rigor',
          summary: 'We do not rely on intuition when data provides clear answers. Every hypothesis is validated through rigorous testing.',
        },
        parent_uuid: 'values-section',
        slot: 'main_slot',
      },
      'val-2': {
        uuid: 'val-2',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Radical Transparency',
          summary: 'Real-time dashboards, unvarnished reporting, and aligned incentives. You always know exactly how your capital performs.',
        },
        parent_uuid: 'values-section',
        slot: 'main_slot',
      },
      'val-3': {
        uuid: 'val-3',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Speed & Execution',
          summary: 'Ideas are cheap. Speed of iteration is the ultimate competitive moat in dynamic digital marketplaces.',
          href: '/about/team',
        },
        parent_uuid: 'values-section',
        slot: 'main_slot',
      },
      'cta-about': {
        uuid: 'cta-about',
        component_id: 'sdc.flexus.cta',
        inputs: {
          heading: 'Meet the Leadership Team Behind Apex',
          summary: 'Explore our cross-disciplinary team of performance strategists, engineers, and creative directors.',
        },
        parent_uuid: null,
        slot: null,
      },
      'cta-team-btn': {
        uuid: 'cta-team-btn',
        component_id: 'sdc.flexus.button',
        inputs: { text: 'View Our Team', href: '/about/team', variant: 'primary' },
        parent_uuid: 'cta-about',
        slot: 'actions',
      },
    },
  },
  '/about/team': {
    id: 'canvas-team',
    title: 'Our Team',
    path: '/about/team',
    component_tree: {
      'hero-team': {
        uuid: 'hero-team',
        component_id: 'sdc.flexus.hero-side-by-side',
        inputs: {
          eyebrow: 'Leadership & Specialists',
          heading: 'The Growth Architects of Apex Digital',
          summary: 'A multidisciplinary collective of senior performance media buyers, technical SEO architects, conversion scientists, and creative strategists.',
        },
        parent_uuid: null,
        slot: null,
      },
      'team-grid': {
        uuid: 'team-grid',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '33-33-33' },
        parent_uuid: null,
        slot: null,
      },
      'member-1': {
        uuid: 'member-1',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Marcus Vance',
          summary: 'Founder & Managing Director • 15+ years scaling tier-1 ecommerce and SaaS ecosystems with over $500M in managed media spend.',
        },
        parent_uuid: 'team-grid',
        slot: 'main_slot',
      },
      'member-2': {
        uuid: 'member-2',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Sarah Jenkins',
          summary: 'VP of Performance Paid Media • Former lead growth engineer at Silicon Valley hyper-growth startups specializing in algorithmic bidding.',
        },
        parent_uuid: 'team-grid',
        slot: 'main_slot',
      },
      'member-3': {
        uuid: 'member-3',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'David Park',
          summary: 'Director of Technical SEO • Specialist in large-scale JavaScript web applications, Core Web Vitals optimization, and generative search.',
        },
        parent_uuid: 'team-grid',
        slot: 'main_slot',
      },
      'member-4': {
        uuid: 'member-4',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Amanda Chen',
          summary: 'Lead Conversion Rate Engineer • Behavioral psychologist and frontend engineer with over 1,200 successful multivariate experiments.',
        },
        parent_uuid: 'team-grid',
        slot: 'main_slot',
      },
      'member-5': {
        uuid: 'member-5',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Liam O\'Connor',
          summary: 'Director of Content & Inbound • Creator of viral inbound content hubs and enterprise digital PR campaigns with high domain authority.',
        },
        parent_uuid: 'team-grid',
        slot: 'main_slot',
      },
      'member-6': {
        uuid: 'member-6',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Jessica Miller',
          summary: 'Lead Paid Social Strategist • Expert in short-form creative production, TikTok/Meta ad hook architecture, and DTC customer journey tuning.',
        },
        parent_uuid: 'team-grid',
        slot: 'main_slot',
      },
    },
  },
  '/case-studies': {
    id: 'canvas-case-studies',
    title: 'Case Studies',
    path: '/case-studies',
    component_tree: {
      'hero-cs': {
        uuid: 'hero-cs',
        component_id: 'sdc.flexus.hero-side-by-side',
        inputs: {
          eyebrow: 'Proven Track Record',
          heading: 'Documented Case Spotlights & Client Returns',
          summary: 'Explore how our performance marketing and technical SEO strategies have delivered transformational financial returns for our partners.',
        },
        parent_uuid: null,
        slot: null,
      },
      'cs-grid': {
        uuid: 'cs-grid',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '33-33-33' },
        parent_uuid: null,
        slot: null,
      },
      'cs-1': {
        uuid: 'cs-1',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'FinTech Unicorn Scale-Up',
          summary: '+410% Qualified MQL Growth and -48% Customer Acquisition Cost (CAC) within 6 months via programmatic Google Ads & landing page CRO.',
          href: '/contact',
        },
        parent_uuid: 'cs-grid',
        slot: 'main_slot',
      },
      'cs-2': {
        uuid: 'cs-2',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Global DTC Luxury Brand',
          summary: 'From $1.2M to $8.4M Annual Run-Rate with 4.8x Blended ROAS across Meta, TikTok Shop, and bespoke email nurture sequences.',
          href: '/contact',
        },
        parent_uuid: 'cs-grid',
        slot: 'main_slot',
      },
      'cs-3': {
        uuid: 'cs-3',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Enterprise B2B Cloud Platform',
          summary: 'Ranked #1 for 180+ High-Intent Keywords, driving $14M in closed-won pipeline through Technical Headless SEO overhaul.',
          href: '/contact',
        },
        parent_uuid: 'cs-grid',
        slot: 'main_slot',
      },
      'testimonials': {
        uuid: 'testimonials',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '50-50' },
        parent_uuid: null,
        slot: null,
      },
      'test-1': {
        uuid: 'test-1',
        component_id: 'sdc.flexus.card-testimonial',
        inputs: {
          quote: 'Apex Digital transformed our marketing department from an expense center into our highest-yielding growth engine. Truly unmatched execution.',
          author: 'Elena Rostova',
          role: 'Chief Marketing Officer',
          company: 'Vertex Cloud',
        },
        parent_uuid: 'testimonials',
        slot: 'main_slot',
      },
      'test-2': {
        uuid: 'test-2',
        component_id: 'sdc.flexus.card-testimonial',
        inputs: {
          quote: 'Their CRO and performance engineering reduced our CAC by half while doubling conversion volume. The ROI was apparent in week three.',
          author: 'Jonathan Hayes',
          role: 'Founder & CEO',
          company: 'Aura Health',
        },
        parent_uuid: 'testimonials',
        slot: 'main_slot',
      },
    },
  },
  '/contact': {
    id: 'canvas-contact',
    title: 'Contact Us',
    path: '/contact',
    component_tree: {
      'hero-contact': {
        uuid: 'hero-contact',
        component_id: 'sdc.flexus.hero-side-by-side',
        inputs: {
          eyebrow: 'Start Your Growth Journey',
          heading: 'Let’s Engineer Your Next Revenue Breakthrough',
          summary: 'Schedule a discovery session with our executive growth team. We will analyze your current funnel and outline custom opportunities.',
        },
        parent_uuid: null,
        slot: null,
      },
      'contact-layout': {
        uuid: 'contact-layout',
        component_id: 'sdc.flexus.section',
        inputs: { columns: '50-50' },
        parent_uuid: null,
        slot: null,
      },
      'info-card': {
        uuid: 'info-card',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Direct Strategic Hubs',
          summary: 'San Francisco: 500 Howard Street, Suite 400 • New York: 1 World Trade Center, Floor 62 • Email: growth@apexdigital.com • Response Guarantee: Within 4 business hours.',
        },
        parent_uuid: 'contact-layout',
        slot: 'main_slot',
      },
      'contact-form-card': {
        uuid: 'contact-form-card',
        component_id: 'sdc.flexus.card',
        inputs: {
          title: 'Request Strategy Audit',
          summary: 'Fill out your company details to connect directly with a dedicated Growth Lead.',
        },
        parent_uuid: 'contact-layout',
        slot: 'main_slot',
      },
    },
  },
};

export async function fetchCanvasPage(pathAlias: string): Promise<CanvasPageData | null> {
  const normalizedPath = pathAlias.startsWith('/') ? pathAlias : `/${pathAlias}`;
  const targetPath = normalizedPath === '/' ? '/home' : normalizedPath;

  try {
    const json = await fetchFromDrupal('/jsonapi/canvas_page/canvas_page');
    const pages = json.data || [];

    // Match page by alias, title slug, or id
    const page = pages.find((p: any) => {
      const title = p.attributes?.title?.toLowerCase().replace(/\s+/g, '-');
      const alias = p.attributes?.path?.alias || `/${title}`;
      return (
        alias === normalizedPath ||
        alias === targetPath ||
        `/${title}` === normalizedPath ||
        (normalizedPath === '/' && (title === 'home' || alias === '/home'))
      );
    });

    if (page && page.attributes?.component_tree && Object.keys(page.attributes.component_tree).length > 0) {
      return {
        id: page.id,
        title: page.attributes.title,
        path: page.attributes.path?.alias || normalizedPath,
        component_tree: page.attributes.component_tree,
      };
    }
  } catch (err) {
    console.warn(`[Next.js Drupal Client] Live fetch notice for ${normalizedPath}: ${(err as Error).message}. Falling back to pre-seeded component tree.`);
  }

  // Resilient fallback for decoupled presentation
  return FALLBACK_PAGES[normalizedPath] || FALLBACK_PAGES[targetPath] || FALLBACK_PAGES['/'] || null;
}

export async function fetchAllCanvasPages(): Promise<Array<{ title: string; path: string }>> {
  try {
    const json = await fetchFromDrupal('/jsonapi/canvas_page/canvas_page');
    return (json.data || []).map((p: any) => ({
      title: p.attributes.title,
      path: p.attributes.path?.alias || `/${p.attributes.title.toLowerCase().replace(/\s+/g, '-')}`,
    }));
  } catch {
    return Object.values(FALLBACK_PAGES).map((p) => ({
      title: p.title,
      path: p.path,
    }));
  }
}

