# Apex Digital Marketing — Drupal 11 & Drupal Canvas Reference Architecture

Welcome to the **Apex Digital Marketing** project repository. This site is built on **Drupal 11**, powered by the local development environment **Lerd**, and architected extensively around **Drupal Canvas** (the Next-Gen visual page building ecosystem) and the **Flexus** component theme.

---

## 🌐 Site Overview & Quick Links

- **Primary Site URL**: [https://drupal-lerd.test/](https://drupal-lerd.test/)
- **Visual Builder Dashboard**: [https://drupal-lerd.test/canvas](https://drupal-lerd.test/canvas) *(requires administrator login)*
- **Theme**: `flexus` (Single Directory Components + Tailwind/Utility system)
- **Framework**: Drupal 11 on PHP 8.5 (FPM) & MySQL via Lerd

---

## 🏗️ Architectural Overview

```mermaid
graph TD
    User([Site Visitor / Editor]) --> Nginx[Nginx Reverse Proxy (*.test)]
    Nginx --> PHP[Drupal 11.4 PHP-FPM]
    PHP --> MySQL[(MySQL Database)]
    
    subgraph Drupal Canvas Layer
        Canvas[Drupal Canvas Engine]
        CP[Canvas Page Content Entities: canvas_page]
        PR[Page Regions: flexus.header & flexus.footer]
        SDC[Single Directory Components: SDC / Flexus]
        Canvas --> CP
        Canvas --> PR
        PR --> SDC
        CP --> SDC
    end

    subgraph Structured Content Layer
        Nodes[Custom Nodes: case_study]
        Taxonomy[Vocabularies: service_category]
        Forms[Drupal Contact Form: feedback]
        Nodes --> Taxonomy
    end
```

---

## 🧩 1. How Drupal Canvas Works

**Drupal Canvas** is a component-driven visual builder designed to provide freedom for site builders and content creators while maintaining strict component isolation and design system integrity.

### Core Canvas Concepts:

1. **Component Entities (`component`)**:
   - Canvas automatically discovers every **Single Directory Component (SDC)** declared by Drupal Core and installed modules/themes (such as `flexus`).
   - For every component (e.g. `sdc.flexus.cta`, `sdc.flexus.card`, `sdc.flexus.section`, `sdc.flexus.hero-side-by-side`, `sdc.flexus.form`), Canvas creates a `component` config entity.
   - Canvas computes a deterministic **`active_version` hash** derived from the component's `*.component.yml` JSON schema. This guarantees component schema consistency and prevents outdated props from breaking rendering.

2. **Component Trees & Props**:
   - Pages and regions in Canvas are stored as structured **Component Trees** (`component_tree` field type).
   - Each element in the tree contains:
     - `uuid`: Unique identifier for the component instance.
     - `component_id`: Machine name of the component (e.g. `sdc.flexus.hero-side-by-side`).
     - `inputs`: Key-value pair of props conforming to the component's JSON schema.
     - `parent_uuid`: UUID of the parent layout component (or `null` for root level).
     - `slot`: Target slot name within the parent component (e.g. `header_slot`, `main_slot`, `hero_slot`, `actions`, `accordion_content`).

3. **Page Regions (`page_region`)**:
   - `page_region` config entities define reusable global layouts such as headers and footers across an entire theme.
   - **`flexus.header`**: Houses `sdc.flexus.navbar` with slots for the branding block (`block.system_branding_block`) and main menu (`block.system_menu_block.main`).
   - **`flexus.footer`**: Houses `sdc.flexus.footer` with slots for social media icons (`sdc.flexus.icon`), footer utility menu (`block.system_menu_block.footer`), and copyright text (`sdc.flexus.text`).

4. **Canvas Pages (`canvas_page`)**:
   - Standalone visual landing pages created as first-class Drupal content entities.
   - Each `canvas_page` supports revisions, URL aliases, and interactive visual editing directly via `/canvas/editor/canvas_page/{id}` or the on-page Canvas HUD.

---

## 🎨 2. Flexus Theme & SDC Component Library

The site leverages the following Single Directory Components located in `web/themes/contrib/flexus/components/`:

| Component ID | Category | Description & Usage |
|---|---|---|
| `sdc.flexus.hero-side-by-side` | Hero | High-impact split hero with responsive banner image, aspect ratio control, corner radii, and content slot. |
| `sdc.flexus.section` | Layout | Multi-column flexible grid system (`100`, `50-50`, `33-33-33`, `25-25-25-25`). Supports `header_slot`, `main_slot`, and `footer_slot`. |
| `sdc.flexus.image` | Media | Responsive media with native **lazy loading** (`loading="lazy"`), aspect ratios (`21:5`, `16:9`, `4:3`), and interactive hover zoom (`group-hover:scale-105`). |
| `sdc.flexus.form` | Interaction | Interactive Drupal form embedding (Core Contact Forms & Webforms) with boxed input styling and configurable border radii. |
| `sdc.flexus.cta` | Marketing | High-conversion hero and call-to-action blocks with heading, summary, and `actions` slot for buttons. |
| `sdc.flexus.heading` | Typography | Responsive headings (H1–H6) with configurable sizing (`heading-responsive-4xl` to `8xl`) and alignment. |
| `sdc.flexus.text` | Typography | Rich-text paragraphs and body formatting. |
| `sdc.flexus.card` | Content | Feature and discipline cards supporting framed/borderless styles, vertical/horizontal orientations, and links. |
| `sdc.flexus.card-pricing` | Commerce | Tiered pricing comparison cards with frequency, feature bullet lists, and highlight ribbons (`promote: true`). |
| `sdc.flexus.card-testimonial` | Social Proof | Quote cards featuring client quotes, citation name, job title, and company. |
| `sdc.flexus.accordion-container` | Interactive | Accordion parent container managing collapsible FAQ items with smooth CSS animations. |
| `sdc.flexus.accordion` | Interactive | Collapsible individual accordion items with animated toggle chevron indicators. |
| `sdc.flexus.button` | Action | Styled CTA buttons with variants (`primary`, `secondary`, `outline`) and icon support. |
| `sdc.flexus.navbar` | Navigation | Responsive navigation bar with mobile burger menu and branding integration. |
| `sdc.flexus.footer` | Navigation | Multi-column responsive global footer with social links and legal links. |

---

## 📑 3. Information Architecture & Content Modeling

### 1. Canvas Landing Pages (`canvas_page`)
- **Homepage (`/home` -> `/`)**: Full-funnel agency showcase featuring:
  - Hero Side-by-Side banner with rich high-res marketing graphic and dual CTA buttons.
  - 3-column Service Highlights (SEO, PPC, CRO).
  - Interactive lazy-loaded analytics showcase image with hover effects.
  - Business Impact Metrics grid ($42M+ Revenue, 340% Growth, 5.4x ROAS, 98% Retention).
  - Client Testimonial cards.
  - Tiered Growth Retainer Pricing cards.
  - Interactive FAQ Accordions.
  - High-impact bottom CTA banner.
- **Services (`/services`)**: Hero Side-by-Side banner with in-depth capability breakdown across SEO, Paid Media, CRO, and Content Strategy.
- **Case Studies Hub (`/case-studies`)**: Hero Side-by-Side banner and client portfolio showcase linking directly to full case study nodes.
- **About Us (`/about`)**: Hero Side-by-Side banner, agency mission, guiding principles (Radical Transparency, Data Hypotheses, Profitability), and team spotlight CTA.
- **Our Team Sub-Section (`/about/team`)**:
  - Hero Side-by-Side header introducing growth strategists and engineers.
  - 3-column Executive Leadership grid (Marcus Vance, Sarah Jenkins, David Park).
  - 3-column Practice Leads grid (Conversion Engineering, Inbound Strategy, Paid Social).
  - Interactive Working Culture & Standards accordions.
- **Contact Us (`/contact`)**:
  - Hero Side-by-Side banner.
  - 50-50 Split Section: Left column with office hubs & direct channels; Right column with **Interactive Drupal Contact Form** (`sdc.flexus.form`).
  - Next-steps workflow accordion.
- **Privacy Policy (`/privacy-policy`) & Terms of Service (`/terms-of-service`)**.

### 2. Custom Content Type: Case Study (`case_study`)
- `title`: Project Title (e.g. *TechFlow SaaS: +340% Pipeline Growth*)
- `field_client`: Client name and industry
- `field_service_category`: Taxonomy reference to `service_category`
- `field_metric_highlight`: Key metric badge (e.g. `+340% Inbound Pipeline`)
- `body`: In-depth strategy narrative, challenges, and execution methodology
- `field_results_summary`: Bulleted list of quantifiable business achievements
- `field_image`: High-resolution project visual

### 3. Taxonomy: Service Category (`service_category`)
- Search Engine Optimization (SEO)
- Performance Paid Ads (PPC & Social)
- Content & Inbound Marketing
- Conversion Rate Optimization (CRO)
- Brand Identity & Web Design

### 4. Navigation Menus
- **Primary Menu (`main`)**:
  - Home (`/`)
  - Services (`/services`)
  - Case Studies (`/case-studies`)
  - About Us (`/about`)
    - **Our Team** (`/about/team`) *(Nested sub-page)*
  - Contact (`/contact`)
- **Footer Menu (`footer`)**:
  - Services (`/services`)
  - Case Studies (`/case-studies`)
  - About Us (`/about`)
  - Contact Us (`/contact`)
  - Privacy Policy (`/privacy-policy`)
  - Terms of Service (`/terms-of-service`)

---

## 🛠️ 4. Managing & Extending Canvas Pages

### Editing Pages Visually
1. Generate an admin one-time login link:
   ```bash
   lerd drush uli
   ```
2. Log into the Drupal administration dashboard.
3. Open the **Canvas Dashboard** at `https://drupal-lerd.test/canvas` or click **Edit in Canvas** when viewing any `canvas_page`.
4. Drag and drop components from the library panel into sections and slots.
5. Edit component properties in real-time in the sidebar inspector.

---

## 💻 5. Local Environment Commands (Lerd)

```bash
# Rebuild Drupal Cache
lerd drush cr

# Check Drupal Status
lerd drush status

# Generate Admin Login Link
lerd drush uli

# Run Database Updates
lerd drush updb -y

# Export Configuration
lerd drush config:export -y
```

---

## 🏛️ 6. Clean Extension Architecture (`apex_core`)

In adherence to Drupal and Composer best practices, **no core, contrib modules, or vendor libraries are modified**. All custom functionality, integrations, and bridges are encapsulated cleanly in custom modules:

- **Twig AST Compatibility Extension**:
  - `Drupal\apex_core\Template\TwigExtension` registers a custom `TwigNodeVisitor` tagged as `twig.extension`.
  - Seamlessly bridges Twig 3.x's AST compiler (`EscapeFilter` node handling) with Drupal 11's `TwigExtension::escapeFilter()`, ensuring that render arrays in component tree templates are processed properly without patching upstream packages.
- **PHP 8.4+ Null-Safe CVA Decorator**:
  - `Drupal\apex_core\Template\SafeCvaTwigExtension` decorates `cva.twig_extension` (`cva` contrib module) via Symfony service decoration.
  - Automatically sanitizes nullable props passed to `cva.apply()` in Single Directory Component templates, eliminating `Using null as an array offset is deprecated` notices under PHP 8.4+ without altering vendor code.


