const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const b = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const p = await b.newPage();
  await p.goto('http://127.0.0.1:5173');
  await p.evaluate(() => {
    localStorage.setItem('creovate_current_user', JSON.stringify({
      id: 'kai-sterling',
      name: 'Kai Sterling',
      email: 'kai@example.com',
      role: 'creator'
    }));
  });
  await p.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  // Open theme selector and click Light Mode
  await p.evaluate(() => {
    const themeBtn = Array.from(document.querySelectorAll('button')).find(btn => (btn.getAttribute('title') || '').includes('Theme:'));
    if (themeBtn) themeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await p.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const lightBtn = btns.find(b => b.innerText.includes('Light Mode'));
    if (lightBtn) lightBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const debugInfo = await p.evaluate(() => {
    const h1 = document.querySelector('h1');
    const computedColor = window.getComputedStyle(h1).color;
    const computedBg = window.getComputedStyle(h1).backgroundColor;

    // Check all rules matching h1
    const matching = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && (h1.matches(rule.selectorText) || rule.selectorText.includes('h1'))) {
            matching.push({
              selector: rule.selectorText,
              cssText: rule.cssText
            });
          }
        }
      } catch (e) {}
    }

    return {
      htmlClass: document.documentElement.className,
      bodyClass: document.body.className,
      computedColor,
      computedBg,
      matching
    };
  });

  console.log(JSON.stringify(debugInfo, null, 2));
  await b.close();
})();
