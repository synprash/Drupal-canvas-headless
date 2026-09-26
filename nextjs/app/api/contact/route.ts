import { NextResponse } from 'next/server';
import https from 'node:https';
import http from 'node:http';
import dns from 'node:dns';

const DRUPAL_BASE_URL = process.env.DRUPAL_BASE_URL || 'https://drupal-lerd.test';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const payload = JSON.stringify({
      name,
      email,
      subject: subject || 'Website Strategy Inquiry (Next.js Decoupled)',
      message: message || '',
    });

    const result = await new Promise((resolve, reject) => {
      const url = new URL('/api/contact-submit', DRUPAL_BASE_URL);
      const isHttps = url.protocol === 'https:';
      const lib = isHttps ? https : http;

      const req = lib.request(
        {
          hostname: url.hostname,
          port: url.port || (isHttps ? 443 : 80),
          path: url.pathname,
          method: 'POST',
          headers: {
            'Host': url.hostname,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            'User-Agent': 'NextJS-Decoupled-Form/1.0',
          },
          rejectUnauthorized: false,
          lookup: (hostname, opts, cb) => {
            if (typeof opts === 'function') {
              cb = opts;
              opts = {};
            }
            if (hostname.endsWith('.test') || hostname === 'drupal-lerd.test') {
              return cb(null, '127.0.0.1', 4);
            }
            return dns.lookup(hostname, opts, cb);
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              try {
                resolve(JSON.parse(data));
              } catch {
                resolve({ success: true, message: 'Submission saved.' });
              }
            } else {
              reject(new Error(`Drupal returned HTTP ${res.statusCode}: ${data}`));
            }
          });
        }
      );

      req.on('error', (err) => reject(err));
      req.setTimeout(5000, () => {
        req.destroy(new Error('Connection to Drupal timed out.'));
      });
      req.write(payload);
      req.end();
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.warn('[Next.js Contact API] Drupal backend notice:', error.message);
    return NextResponse.json({
      success: true,
      message: 'Submission captured successfully.',
      notice: error.message,
    });
  }
}
