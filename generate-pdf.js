const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8889', { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluateHandle('document.fonts.ready');
  await page.waitForTimeout(1500);

  const pdfPath = path.join(__dirname, 'Acasting-Showcase-All-Things-Live.pdf');

  // A4 landscape: 297mm × 210mm
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
    preferCSSPageSize: true,
  });

  const stats = fs.statSync(pdfPath);
  console.log(`PDF saved: ${pdfPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

  await browser.close();
})();
