import { createCanvas } from 'canvas';
import * as pdfjsLib from '/Users/badersanad/Desktop/bader-sanad-website/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const PDF_PATH = '/Users/badersanad/Desktop/bader-sanad-website/ Bader\'s Portfolio .pdf';
const OUT_DIR = '/Users/badersanad/Desktop/bader-sanad-website/attached_assets/portfolio_images';

mkdirSync(OUT_DIR, { recursive: true });

const data = new Uint8Array(readFileSync(PDF_PATH));
const doc = await pdfjsLib.getDocument({ data, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true }).promise;

console.log(`Total pages: ${doc.numPages}`);

for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  await page.render({ canvasContext: ctx, viewport }).promise;

  const buf = canvas.toBuffer('image/jpeg', { quality: 0.92 });
  const outPath = join(OUT_DIR, `page_${String(i).padStart(2,'0')}.jpg`);
  writeFileSync(outPath, buf);
  console.log(`Saved page ${i} -> ${outPath}`);
}
