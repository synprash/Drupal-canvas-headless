import https from 'node:https';
import http from 'node:http';
import { drupalConfig } from '@/config/drupal';

export interface NetworkRequestOptions {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  headers?: Record<string, string>;
  body?: string;
  timeoutMs?: number;
}

/**
 * Performs low-level HTTP/HTTPS requests to the Drupal backend.
 * Automatically handles loopback IP resolution, SNI TLS negotiation, and header mapping.
 */
export function executeDrupalRequest<T>(options: NetworkRequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(options.path, drupalConfig.baseUrl);
      const isHttps = url.protocol === 'https:';
      const lib = isHttps ? https : http;

      const reqOptions: https.RequestOptions = {
        hostname: drupalConfig.hostIp,
        port: isHttps ? drupalConfig.httpsPort : drupalConfig.httpPort,
        path: url.pathname + url.search,
        method: options.method || 'GET',
        headers: {
          'Host': drupalConfig.hostHeader,
          'Accept': 'application/vnd.api+json, application/json',
          'User-Agent': 'Apex-NextJS-Client/1.0',
          ...(options.headers || {}),
        },
        servername: isHttps ? drupalConfig.hostHeader : undefined,
        rejectUnauthorized: drupalConfig.rejectUnauthorized,
      };

      const req = lib.request(reqOptions, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(responseBody));
            } catch {
              resolve(responseBody as unknown as T);
            }
          } else {
            reject(new Error(`Drupal returned HTTP ${res.statusCode}: ${responseBody}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      const timeout = options.timeoutMs || drupalConfig.requestTimeoutMs;
      req.setTimeout(timeout, () => {
        req.destroy(new Error(`Request to Drupal timed out after ${timeout}ms`));
      });

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    } catch (err) {
      reject(err);
    }
  });
}
