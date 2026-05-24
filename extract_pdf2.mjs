import { fromPath } from 'pdf2pic';
import { mkdirSync } from 'fs';

const OUT_DIR = '/Users/badersanad/Desktop/bader-sanad-website/attached_assets/portfolio_images';
mkdirSync(OUT_DIR, { recursive: true });

const options = {
  density: 150,
  saveFilename: 'page',
  savePath: OUT_DIR,
  format: 'jpg',
  width: 1200,
  height: 1600,
};

const convert = fromPath('/Users/badersanad/Desktop/bader-sanad-website/ Bader\'s Portfolio .pdf', options);

for (let i = 1; i <= 15; i++) {
  try {
    const result = await convert(i);
    console.log(`Page ${i}: ${result.path}`);
  } catch (e) {
    console.error(`Page ${i} failed:`, e.message);
  }
}
