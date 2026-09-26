# Headless Drupal Next.js Frontend

Enterprise-grade, decoupled frontend for Drupal powered by **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Drupal Experience Builder / Single Directory Components (SDC)**.

---

## 🏛 Architecture Overview

This decoupled architecture establishes a clean, extensible, and type-safe bridge between Drupal (the headless content backend) and Next.js (the high-performance frontend).

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Next.js App Router                            │
│                                                                        │
│   ┌────────────────────┐          ┌────────────────────────────────┐   │
│   │   Layout / Shell   │          │   Dynamic Page Routes          │   │
│   │  (Navbar & Footer) │          │   (app/[[...slug]]/page.tsx)   │   │
│   └─────────┬──────────┘          └───────────────┬────────────────┘   │
│             │                                     │                    │
│             ▼                                     ▼                    │
│   ┌────────────────────┐          ┌────────────────────────────────┐   │
│   │    Site Config     │          │      Canvas Tree Renderer      │   │
│   │  (config/site.ts)  │          │ (CanvasTreeRenderer/registry)  │   │
│   └────────────────────┘          └───────────────┬────────────────┘   │
│                                                   │                    │
│                                                   ▼                    │
│                                   ┌────────────────────────────────┐   │
│                                   │   SDC Component Library        │   │
│                                   │   (components/canvas/*)        │   │
│                                   └───────────────┬────────────────┘   │
│                                                   │                    │
│                                                   ▼                    │
│                                   ┌────────────────────────────────┐   │
│                                   │         Drupal Client          │   │
│                                   │     (lib/drupal-client.ts)     │   │
│                                   └───────────────┬────────────────┘   │
└───────────────────────────────────────────────────┼────────────────────┘
                                                    │
                                                    ▼
                                    ┌────────────────────────────────┐
                                    │    Drupal 11 Backend (Lerd)    │
                                    │  • JSON:API Endpoints          │
                                    │  • Experience Builder Trees    │
                                    │  • Webform Submissions API     │
                                    └────────────────────────────────┘
```

---

## 📁 Directory Structure

```
nextjs/
├── app/                        # Next.js App Router
│   ├── api/                    # Route handlers (e.g. /api/contact proxy)
│   ├── [[...slug]]/            # Catch-all dynamic route rendering Canvas trees
│   ├── layout.tsx              # Root HTML shell, Navbar & Footer
│   ├── globals.css             # Tailwind base styles
│   └── favicon.ico
├── components/                 # UI Components
│   ├── canvas/                 # Single Directory Component (SDC) equivalents
│   │   ├── Accordion.tsx       # Collapsible FAQ / Accordion
│   │   ├── Button.tsx          # Standalone CTA buttons
│   │   ├── Card.tsx            # Feature, article, and case study cards
│   │   ├── CardPricing.tsx     # Pricing tiers & feature lists
│   │   ├── CardTestimonial.tsx # Customer testimonial cards with ratings
│   │   ├── CanvasTreeRenderer.tsx # Recursive slot & component dispatcher
│   │   ├── CTA.tsx             # Call-to-action banner sections
│   │   ├── Form.tsx            # Interactive Webform client with dual-channel submit
│   │   ├── Heading.tsx         # Semantic heading hierarchy (H1-H6)
│   │   ├── HeroSideBySide.tsx  # Hero banners with title, lead, CTAs & image
│   │   ├── registry.ts         # Component Registry mapping Drupal SDC IDs to React
│   │   ├── Section.tsx         # Container sections with background variants
│   │   ├── StatCounter.tsx     # Metric counters & statistics
│   │   └── Text.tsx            # Rich text and body typography
│   ├── Navbar.tsx              # Dynamic header navigation driven by config
│   └── Footer.tsx              # Dynamic footer driven by config
├── config/                     # Centralized configurations (zero hardcoded values)
│   ├── drupal.ts               # Backend connection, endpoints, and TLS settings
│   └── site.ts                 # Branding, navigation links, and footer links
├── data/                       # Static fallback & seed trees
│   └── fallback-pages.ts       # Structured Canvas component trees for 6 core pages
├── lib/                        # Service & data access layer
│   ├── drupal-client.ts        # Typed DrupalClient class for JSON:API & forms
│   ├── drupal.ts               # Clean re-export adapter
│   └── network.ts              # Resilient Node/TLS network fetcher with SNI support
└── types/                      # Strict TypeScript type contracts
    ├── canvas.ts               # CanvasComponentNode, CanvasComponentTree, PageData
    └── drupal.ts               # JSON:API response structures, Webform types
```

---

## 🧩 Drupal SDC Component Registry

Each Drupal Single Directory Component (SDC) in `experience_builder` is mapped 1:1 to a React component in `components/canvas/registry.ts`:

| Drupal SDC ID | React Component | Primary Props / Inputs |
| :--- | :--- | :--- |
| `apex:hero-side-by-side` | `HeroSideBySide.tsx` | `title`, `lead_text`, `image_url`, `primary_cta_text`, `primary_cta_url` |
| `apex:section` | `Section.tsx` | `title`, `subtitle`, `background` (`white` \| `gray` \| `dark` \| `primary`) + `children` slot |
| `apex:card` | `Card.tsx` | `title`, `description`, `icon`, `image_url`, `link_url`, `tag` |
| `apex:card-pricing` | `CardPricing.tsx` | `plan_name`, `price`, `billing_period`, `features`, `is_popular`, `cta_text` |
| `apex:card-testimonial` | `CardTestimonial.tsx` | `quote`, `author_name`, `author_role`, `author_company`, `rating` |
| `apex:cta` | `CTA.tsx` | `title`, `description`, `primary_button_text`, `primary_button_url` |
| `apex:form` | `Form.tsx` | `form_id`, `submit_url`, `title`, `description` |
| `apex:accordion` | `Accordion.tsx` | `items` (`{ title, content }[]`), `allow_multiple` |
| `apex:heading` | `Heading.tsx` | `text`, `level` (`h1`-`h6`), `align` (`left` \| `center` \| `right`) |
| `apex:text` | `Text.tsx` | `text`, `format` (`plain` \| `html`), `size` |
| `apex:button` | `Button.tsx` | `text`, `url`, `variant` (`primary` \| `secondary` \| `outline`) |
| `apex:stat-counter` | `StatCounter.tsx` | `value`, `label`, `prefix`, `suffix` |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` to override default settings:

```bash
# Public URL for browser-side fetches (e.g., direct form submissions)
NEXT_PUBLIC_DRUPAL_BASE_URL=https://drupal-lerd.test

# Server-side connection to Drupal (used by Next.js SSR / SSG)
DRUPAL_BASE_URL=https://drupal-lerd.test
DRUPAL_HOST_IP=127.0.0.1
DRUPAL_HTTPS_PORT=443
DRUPAL_HOST_HEADER=drupal-lerd.test
DRUPAL_ALLOW_INSECURE_TLS=true
DRUPAL_REQUEST_TIMEOUT=10000

# Site Configuration
NEXT_PUBLIC_SITE_NAME="Apex Enterprise"
NEXT_PUBLIC_SITE_TAGLINE="Next-Generation Enterprise Digital Experience Platform"
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🧪 Form Submissions & Drupal Webform Integration

Form submissions on `/contact` utilize a resilient dual-channel strategy:

1. **Client-Side Direct Submission (Browser → Drupal)**:  
   The browser sends an asynchronous `POST` to Drupal's custom headless endpoint: `https://drupal-lerd.test/api/contact-submit`.  
   Drupal's `apex_core` module handles CORS preflight (`OPTIONS`) and writes directly into the Drupal Webform entity storage.
2. **Server-Side Fallback (Browser → Next.js API Route → Drupal)**:  
   If the browser encounters an issue, Next.js provides `/api/contact` which relays the submission securely using the configured `DrupalClient`.
3. **Admin Verification**:  
   Submissions are immediately recorded and viewable in Drupal at `/admin/structure/webform/manage/contact/results/submissions`.
