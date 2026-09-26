import { drupalConfig } from '@/config/drupal';

/**
 * Resolves a relative or absolute Drupal media/image URL to a fully-qualified URL.
 * Handles strings, objects with src/url properties, and null/undefined values.
 *
 * @param media Media path string or object containing src/url/alt properties
 * @returns Fully qualified absolute URL, or empty string if invalid
 *
 * @example
 * resolveDrupalMediaUrl('/sites/default/files/2026-09/banner.jpg')
 * // => 'https://drupal-lerd.test/sites/default/files/2026-09/banner.jpg'
 *
 * resolveDrupalMediaUrl({ src: 'sites/default/files/team.png' })
 * // => 'https://drupal-lerd.test/sites/default/files/team.png'
 *
 * resolveDrupalMediaUrl('https://images.unsplash.com/photo-123')
 * // => 'https://images.unsplash.com/photo-123'
 */
export function resolveDrupalMediaUrl(
  media?: string | { src?: string; url?: string; alt?: string } | null
): string {
  if (!media) return '';

  let src = '';
  if (typeof media === 'string') {
    src = media;
  } else if (typeof media === 'object') {
    src = media.src || media.url || '';
  }

  if (!src || typeof src !== 'string') return '';

  src = src.trim();

  // Already absolute URL with protocol, data URI, or blob URI
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }

  // Protocol-relative URL (e.g. //drupal-lerd.test/...)
  if (src.startsWith('//')) {
    return `https:${src}`;
  }

  // Retrieve base Drupal backend URL
  const baseUrl = (
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ||
    drupalConfig.baseUrl ||
    'https://drupal-lerd.test'
  ).replace(/\/+$/, '');

  // Root-relative path (e.g. /sites/default/files/...)
  if (src.startsWith('/')) {
    return `${baseUrl}${src}`;
  }

  // Relative path without leading slash (e.g. sites/default/files/...)
  return `${baseUrl}/${src}`;
}

/**
 * Formats rich HTML markup from Drupal by rewriting relative image, media, and asset URLs.
 *
 * Replaces:
 * - <img src="/sites/..." /> -> <img src="https://drupal-lerd.test/sites/..." />
 * - <img src="/core/..." /> -> <img src="https://drupal-lerd.test/core/..." />
 * - <a href="/sites/default/files/..." /> -> <a href="https://drupal-lerd.test/sites/default/files/..." />
 * - srcset="/sites/... 1x, /sites/... 2x" -> fully qualified srcset URLs
 *
 * @param html Raw HTML markup from Drupal WYSIWYG or text fields
 * @returns Cleaned HTML string with fully resolved asset paths
 */
export function formatDrupalHtml(html?: string | null): string {
  if (!html || typeof html !== 'string') return '';

  const baseUrl = (
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ||
    drupalConfig.baseUrl ||
    'https://drupal-lerd.test'
  ).replace(/\/+$/, '');

  return html
    // Rewrite src="/sites/...", src="/core/...", src="/themes/...", src="/modules/..."
    .replace(/(src\s*=\s*["'])(\/(?:sites|core|themes|modules)\/[^"']+)(["'])/gi, `$1${baseUrl}$2$3`)
    // Rewrite href to Drupal files e.g. href="/sites/default/files/..."
    .replace(/(href\s*=\s*["'])(\/sites\/[^"']+)(["'])/gi, `$1${baseUrl}$2$3`)
    // Rewrite srcset entries
    .replace(/(srcset\s*=\s*["'])([^"']+)(["'])/gi, (_match, prefix, srcsetVal, suffix) => {
      const updatedSrcset = srcsetVal
        .split(',')
        .map((part: string) => {
          const trimmed = part.trim();
          if (trimmed.startsWith('/')) {
            return `${baseUrl}${trimmed}`;
          }
          return trimmed;
        })
        .join(', ');
      return `${prefix}${updatedSrcset}${suffix}`;
    });
}
