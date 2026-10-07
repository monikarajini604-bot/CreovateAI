const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const b = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,960']
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
  await new Promise(r => setTimeout(r, 1000));

  // Click the theme dropdown button
  await p.evaluate(() => {
    const themeBtn = Array.from(document.querySelectorAll('button')).find(btn => (btn.getAttribute('title') || '').includes('Theme:'));
    if (themeBtn) themeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Click Light Mode option
  await p.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const lightBtn = btns.find(b => b.innerText.includes('Light Mode'));
    if (lightBtn) lightBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const check = await p.evaluate(() => {
    const htmlCls = document.documentElement.className;
    const bodyCls = document.body.className;
    const h1 = document.querySelector('h1');
    const pTag = document.querySelector('h1 + p');
    const card = document.querySelector('.bg-\\[\\#0c1222\\]');
    return {
      htmlCls,
      bodyCls,
      h1Color: h1 ? window.getComputedStyle(h1).color : null,
      pColor: pTag ? window.getComputedStyle(pTag).color : null,
      cardBg: card ? window.getComputedStyle(card).backgroundColor : null
    };
  });
  console.log('Result after switching to Light Mode via UI:');
  console.log(JSON.stringify(check, null, 2));

  await p.screenshot({ path: 'C:\\Users\\lavan_7fd3br1\\.gemini\\antigravity-ide\\brain\\aa00b169-bdf6-44c9-acb4-62397fccbc6f\\real_light_mode_screenshot.png' });
  await b.close();
})();
