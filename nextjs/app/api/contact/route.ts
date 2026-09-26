import { NextResponse } from 'next/server';
import https from 'node:https';

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

    const result = await new Promise<{ success: boolean; sid?: string; message?: string }>((resolve, reject) => {
      const options: https.RequestOptions = {
        hostname: '127.0.0.1',
        port: 443,
        path: '/api/contact-submit',
        method: 'POST',
        headers: {
          'Host': 'drupal-lerd.test',
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'User-Agent': 'Apex-NextJS-Client/1.0',
        },
        servername: 'drupal-lerd.test',
        rejectUnauthorized: false,
      };

      const req = https.request(options, (res) => {
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
      });

      req.on('error', (err) => reject(err));
      req.setTimeout(5000, () => {
        req.destroy(new Error('Connection to Drupal timed out.'));
      });
      req.write(payload);
      req.end();
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('[Next.js Contact API Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit form to Drupal.' },
      { status: 500 }
    );
  }
}

