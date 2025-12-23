const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, '..', 'data', 'menus_raw.json');
const outPath = path.join(__dirname, '..', 'data', 'menus_parsed.json');

if (!fs.existsSync(rawPath)) {
  console.error('Missing OCR results at data/menus_raw.json. Run scripts/ocr.js first.');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

const priceRe = /(?<!\d)(\d{1,2}[,\.]\d{3})(?!\d)/;

function parseText(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const items = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(priceRe);
    if (m) {
      const price = m[1];
      // title is content before price
      const idx = line.lastIndexOf(m[0]);
      let title = line.slice(0, idx).trim();
      // If title empty, maybe previous line was title
      if (!title && i > 0) {
        title = lines[i-1];
      }
      // description: following lines until next price or blank
      let desc = [];
      for (let j = i+1; j < lines.length; j++) {
        if (priceRe.test(lines[j])) break;
        // stop if next block looks like another section heading (all caps short)
        desc.push(lines[j]);
      }
      items.push({ title: title, price: price.replace('.', ','), description: desc.join(' ') });
    }
  }
  return items;
}

const parsed = {};
for (const [file, text] of Object.entries(raw)) {
  parsed[file] = parseText(text);
}

fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
console.log('Parsed menus written to data/menus_parsed.json');
