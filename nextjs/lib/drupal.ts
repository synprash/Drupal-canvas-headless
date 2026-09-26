/**
 * Main entry point for Drupal data services.
 * Re-exports DrupalClient and canonical type contracts.
 */
import { drupalClient } from './drupal-client';

export * from '@/types/canvas';
export * from '@/types/drupal';
export { drupalClient } from './drupal-client';

/**
 * Functional wrapper for fetching a page by path (backward compatibility).
 */
export async function fetchCanvasPage(path: string) {
  return drupalClient.getPageByPath(path);
}

/**
 * Functional wrapper for fetching all pages (backward compatibility).
 */
export async function fetchAllCanvasPages() {
  return drupalClient.getAllPages();
}
