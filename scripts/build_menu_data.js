const fs = require('fs');
const path = require('path');

const parsedPath = path.join(__dirname, '..', 'data', 'menus_parsed.json');
const rawPath = path.join(__dirname, '..', 'data', 'menus_raw.json');
const outPath = path.join(__dirname, '..', 'data', 'menus_structured.json');

if (!fs.existsSync(parsedPath) || !fs.existsSync(rawPath)) {
  console.error('Parsed or raw OCR files missing; run scripts/ocr.js and scripts/parse_menus.js first.');
  process.exit(1);
}

const parsed = JSON.parse(fs.readFileSync(parsedPath, 'utf8'));
const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

function guessLabel(text, filename) {
  // look for a line with multiple uppercase words
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (const l of lines.slice(0, 6)) {
    if (/^[\s\|]*[A-ZÉÈÀÙÂÊÎÔÛÇ\s]{3,}$/.test(l.replace(/\|/g, '').trim())) {
      return l.replace(/\|/g, '').trim();
    }
  }
  // fallback from filename
  const id = path.basename(filename, path.extname(filename));
  return id.replace(/_/g, ' ').toUpperCase();
}

const sections = Object.keys(parsed).map((file) => {
  const items = parsed[file].map(i => ({ title: i.title.replace(/^\|\s*/, ''), price: i.price, description: i.description.replace(/^\|\s*/, '') }));

  // distribute items into left/right boxes alternating
  const left = [];
  const right = [];
  for (let i = 0; i < items.length; i++) {
    if (i % 2 === 0) left.push(items[i]); else right.push(items[i]);
  }

  return {
    id: path.basename(file, path.extname(file)),
    label: guessLabel(raw[file] || '', file),
    leftItems: left,
    rightItems: right,
  };
});

fs.writeFileSync(outPath, JSON.stringify(sections, null, 2));
console.log('Wrote structured menu data to', outPath);
