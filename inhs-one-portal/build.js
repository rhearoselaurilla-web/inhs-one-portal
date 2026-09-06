/**
 * Build step for Netlify.
 * Reads index.html, replaces the __SUPABASE_URL__ / __SUPABASE_ANON_KEY__
 * placeholders with the real values from Netlify's environment variables,
 * and writes the result into dist/index.html (the published folder).
 *
 * Set SUPABASE_URL and SUPABASE_ANON_KEY under:
 *   Netlify → Site configuration → Environment variables
 */
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'WARNING: SUPABASE_URL and/or SUPABASE_ANON_KEY are not set. ' +
    'Set them in Netlify > Site configuration > Environment variables.'
  );
}

const srcPath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'dist');
const outPath = path.join(outDir, 'index.html');

let html = fs.readFileSync(srcPath, 'utf8');
html = html
  .split('__SUPABASE_URL__').join(SUPABASE_URL)
  .split('__SUPABASE_ANON_KEY__').join(SUPABASE_ANON_KEY);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html);

console.log('Build complete → dist/index.html');
