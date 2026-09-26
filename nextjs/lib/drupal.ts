import https from 'https';

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

export async function fetchCanvasPage(pathAlias: string): Promise<CanvasPageData | null> {
  const normalizedPath = pathAlias.startsWith('/') ? pathAlias : `/${pathAlias}`;
  const targetPath = normalizedPath === '/' ? '/home' : normalizedPath;

  try {
    const url = `${DRUPAL_BASE_URL}/jsonapi/canvas_page/canvas_page`;
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch from Drupal JSON:API: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    const pages = json.data || [];

    // Find the page matching title or alias
    const page = pages.find((p: any) => {
      const title = p.attributes.title?.toLowerCase().replace(/\s+/g, '-');
      const alias = p.attributes.path?.alias || `/${title}`;
      return alias === normalizedPath || alias === targetPath || `/${title}` === normalizedPath || (normalizedPath === '/' && (title === 'home' || alias === '/home'));
    });

    if (!page) {
      return null;
    }

    return {
      id: page.id,
      title: page.attributes.title,
      path: page.attributes.path?.alias || normalizedPath,
      component_tree: page.attributes.component_tree || {},
    };
  } catch (err) {
    console.error('Error fetching Canvas page from Drupal:', err);
    return null;
  }
}

export async function fetchAllCanvasPages(): Promise<Array<{ title: string; path: string }>> {
  try {
    const url = `${DRUPAL_BASE_URL}/jsonapi/canvas_page/canvas_page`;
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map((p: any) => ({
      title: p.attributes.title,
      path: p.attributes.path?.alias || `/${p.attributes.title.toLowerCase().replace(/\s+/g, '-')}`,
    }));
  } catch {
    return [];
  }
}
