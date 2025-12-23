const fs = require('fs');
const path = require('path');
const { createWorker } = require('tesseract.js');

async function runOCR() {
  const dir = path.join(__dirname, '..', 'public', 'coffee');
  const files = fs.readdirSync(dir).filter(f => /menu_page-.*\.jpg$/i.test(f));
  const worker = await createWorker('fra+eng');

  const results = {};
  for (const file of files) {
    process.stdout.write(`\nProcessing ${file} `);
    const filePath = path.join(dir, file);
    const { data } = await worker.recognize(filePath);
    const text = data?.text ?? "";
    results[file] = text;
    process.stdout.write(' ✓\n');
  }

  await worker.terminate();

  const outDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(path.join(outDir, 'menus_raw.json'), JSON.stringify(results, null, 2));
  console.log('\nSaved OCR results to data/menus_raw.json');
}

runOCR().catch(err => {
  console.error(err);
  process.exit(1);
});