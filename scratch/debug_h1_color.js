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
    localStorage.setItem('creovate_theme', 'light');
  });
  await p.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const matchedRules = await p.evaluate(() => {
    const el = document.querySelector('h1');
    const matches = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && el.matches(rule.selectorText)) {
            if (rule.style.color) {
              matches.push({
                selector: rule.selectorText,
                color: rule.style.color,
                cssText: rule.cssText
              });
            }
          }
        }
      } catch (e) {}
    }
    return matches;
  });

  console.log('Matched CSS rules with color on h1:');
  console.log(JSON.stringify(matchedRules, null, 2));
  await b.close();
})();
