const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.resolve(__dirname, 'landing_preview.png'), fullPage: false });

  // Now login to see dashboard preview
  await page.evaluate(() => {
    const btn = document.querySelector('#welcome-sign-in-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const kaiBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Kai Sterling'));
    if (kaiBtn) kaiBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  await page.evaluate(() => {
    const submitBtn = document.querySelector('form button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: path.resolve(__dirname, 'creator_studio_preview.png'), fullPage: false });

  // Switch to brand dashboard
  await page.evaluate(() => {
    const brandBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Brand / Agency'));
    if (brandBtn) brandBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: path.resolve(__dirname, 'brand_dashboard_preview.png'), fullPage: false });

  console.log('Screenshots captured successfully!');
  await browser.close();
})();
