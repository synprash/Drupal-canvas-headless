/**
 * Drupal Backend Environment Configuration.
 * Centralizes all connection parameters, endpoints, timeouts, and headers.
 */
export const drupalConfig = {
  /**
   * Base URL of the Drupal backend.
   * Can be overridden via DRUPAL_BASE_URL environment variable.
   */
  baseUrl: process.env.DRUPAL_BASE_URL || 'https://drupal-lerd.test',

  /**
   * Internal IP address for direct loopback resolution (bypassing OS DNS issues on .test domains).
   */
  hostIp: process.env.DRUPAL_HOST_IP || '127.0.0.1',

  /**
   * HTTPS port for local development backend.
   */
  httpsPort: parseInt(process.env.DRUPAL_HTTPS_PORT || '443', 10),

  /**
   * HTTP port for local development backend.
   */
  httpPort: parseInt(process.env.DRUPAL_HTTP_PORT || '80', 10),

  /**
   * SNI Host header required by local Nginx reverse-proxy.
   */
  hostHeader: process.env.DRUPAL_HOST_HEADER || 'drupal-lerd.test',

  /**
   * Endpoints used by decoupled frontend.
   */
  endpoints: {
    canvasPagesJsonApi: '/jsonapi/canvas_page/canvas_page',
    contactSubmit: '/api/contact-submit',
  },

  /**
   * Request timeout in milliseconds.
   */
  requestTimeoutMs: parseInt(process.env.DRUPAL_REQUEST_TIMEOUT_MS || '5000', 10),

  /**
   * Whether to reject unauthorized SSL certificates.
   * Disabled by default in non-production environments to support local mkcert certificates.
   */
  rejectUnauthorized: process.env.NODE_ENV === 'production' && process.env.DRUPAL_STRICT_SSL === 'true',
};

export type DrupalConfig = typeof drupalConfig;
