import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Custom local API database middleware plugin
const localDbPlugin = () => {
  const dbPath = path.resolve(__dirname, 'db.json');

  // Initialize db.json if not exists
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ initialized: false }, null, 2));
  }

  return {
    name: 'local-db-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/data') {
          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            const data = fs.readFileSync(dbPath, 'utf-8');
            res.end(data);
          } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
          }
        } else {
          next();
        }
      });
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localDbPlugin()],
  server: {
    host: true, // Exposes Vite on the local network (0.0.0.0) so your mobile phone can connect!
    watch: {
      ignored: ['**/db.json'] // Prevent infinite HMR refresh loops when writing data locally!
    }
  }
})
