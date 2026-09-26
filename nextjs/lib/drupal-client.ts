import { drupalConfig } from '@/config/drupal';
import { executeDrupalRequest } from './network';
import { FALLBACK_PAGES } from '@/data/fallback-pages';
import {
  CanvasPageData,
  CanvasComponentNode,
  CanvasComponentTree,
} from '@/types/canvas';
import {
  DrupalJsonApiCanvasPage,
  DrupalJsonApiResponse,
  ContactFormInput,
  WebformSubmissionResult,
} from '@/types/drupal';

/**
 * Service client for interacting with Drupal 11 JSON:API and REST endpoints.
 */
export class DrupalClient {
  /**
   * Fetches a Canvas page component tree by URL alias or route slug.
   *
   * @param pathAlias URL path to resolve (e.g. '/', '/services', '/about/team')
   * @returns Resolved CanvasPageData entity with parsed component tree, or null
   */
  public async getPageByPath(pathAlias: string): Promise<CanvasPageData | null> {
    const normalizedPath = pathAlias.startsWith('/') ? pathAlias : `/${pathAlias}`;
    const targetPath = normalizedPath === '/' ? '/home' : normalizedPath;

    try {
      const response = await executeDrupalRequest<DrupalJsonApiResponse<DrupalJsonApiCanvasPage>>({
        path: drupalConfig.endpoints.canvasPagesJsonApi,
        method: 'GET',
      });

      const pages = response.data || [];

      // Find matching page by alias, title slug, or internal ID
      const page = pages.find((p) => {
        const titleSlug = p.attributes?.title?.toLowerCase().replace(/\s+/g, '-');
        const alias = p.attributes?.path?.alias || `/${titleSlug}`;
        return (
          alias === normalizedPath ||
          alias === targetPath ||
          `/${titleSlug}` === normalizedPath ||
          (normalizedPath === '/' && (titleSlug === 'home' || alias === '/home'))
        );
      });

      if (page && page.attributes) {
        const rawComponents = page.attributes.components || page.attributes.component_tree;
        if (rawComponents) {
          const tree: CanvasComponentTree = {};
          if (Array.isArray(rawComponents)) {
            rawComponents.forEach((comp: CanvasComponentNode) => {
              if (comp.uuid) tree[comp.uuid] = comp;
            });
          } else if (typeof rawComponents === 'object') {
            Object.assign(tree, rawComponents);
          }

          if (Object.keys(tree).length > 0) {
            return {
              id: page.id,
              title: page.attributes.title,
              path: page.attributes.path?.alias || normalizedPath,
              component_tree: tree,
            };
          }
        }
      }
    } catch (error: any) {
      console.warn(
        `[DrupalClient] Live fetch warning for "${normalizedPath}": ${error.message}. Using resilient fallback tree.`
      );
    }

    // Fallback to pre-seeded dataset for decoupled resilience
    return FALLBACK_PAGES[normalizedPath] || FALLBACK_PAGES[targetPath] || FALLBACK_PAGES['/'] || null;
  }

  /**
   * Retrieves all published Canvas pages for static generation and sitemaps.
   */
  public async getAllPages(): Promise<Array<{ title: string; path: string }>> {
    try {
      const response = await executeDrupalRequest<DrupalJsonApiResponse<DrupalJsonApiCanvasPage>>({
        path: drupalConfig.endpoints.canvasPagesJsonApi,
        method: 'GET',
      });

      return (response.data || []).map((p) => ({
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

  /**
   * Submits a webform inquiry to Drupal backend.
   *
   * @param input Contact form payload
   */
  public async submitContactForm(input: ContactFormInput): Promise<WebformSubmissionResult> {
    const payload = JSON.stringify({
      name: input.name,
      email: input.email,
      subject: input.subject || 'Website Strategy Inquiry (Next.js Decoupled)',
      message: input.message || '',
    });

    return executeDrupalRequest<WebformSubmissionResult>({
      path: drupalConfig.endpoints.contactSubmit,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload).toString(),
      },
      body: payload,
    });
  }
}

/** Singleton export instance */
export const drupalClient = new DrupalClient();
