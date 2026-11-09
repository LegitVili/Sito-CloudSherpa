// Genera i file di reindirizzamento 301 per l'hosting a partire dai vecchi URL WordPress.
// - public/_redirects  (Netlify, Cloudflare Pages)
// - vercel.json        (Vercel)
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const legacy = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/legacy-redirects.json'), 'utf8'));
const pages = {
  '/sezione-chi-siamo/': '/chi-siamo/',
  '/sezione-come-operiamo/': '/come-operiamo/',
  '/i-nostri-servizi/': '/servizi/',
  '/sezione-le-nostre-soluzioni/': '/soluzioni/',
  '/contact/': '/contatti/',
};
const all = { ...pages, ...legacy };

const lines = Object.entries(all).map(([from, to]) => `${from} ${to} 301`);
await fs.writeFile(path.join(ROOT, 'public/_redirects'), lines.join('\n') + '\n');

const vercel = {
  trailingSlash: true,
  redirects: Object.entries(all).map(([source, destination]) => ({ source, destination, statusCode: 301 })),
};
await fs.writeFile(path.join(ROOT, 'vercel.json'), JSON.stringify(vercel, null, 2) + '\n');
console.log(`${lines.length} reindirizzamenti scritti`);
