import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // Add CORS headers so Vercel can handle cross-device connections cleanly
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // MODE A: Cloud Database (when deployed on Vercel with free Blob Storage connected)
  if (token) {
    try {
      if (req.method === 'GET') {
        const { blobs } = await list({ token });
        const dbBlob = blobs.find(b => b.pathname === 'db.json');

        if (dbBlob) {
          const response = await fetch(dbBlob.url);
          const data = await response.json();
          return res.status(200).json(data);
        } else {
          return res.status(200).json({ initialized: false });
        }
      } else if (req.method === 'POST') {
        const payload = req.body;
        const blob = await put('db.json', JSON.stringify(payload, null, 2), {
          access: 'public',
          addRandomSuffix: false, // Keep the URL permanent
          token
        });
        return res.status(200).json({ success: true, url: blob.url });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // MODE B: Local Development Database (fallback for offline localhost testing)
  const dbPath = path.resolve(process.cwd(), 'db.json');

  try {
    if (req.method === 'GET') {
      if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ initialized: false }, null, 2));
      }
      const data = fs.readFileSync(dbPath, 'utf-8');
      return res.status(200).json(JSON.parse(data));
    } else if (req.method === 'POST') {
      const payload = req.body;
      fs.writeFileSync(dbPath, JSON.stringify(payload, null, 2));
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
