const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACTS_DIR = 'C:\\Users\\lavan_7fd3br1\\.gemini\\antigravity-ide\\brain\\aa00b169-bdf6-44c9-acb4-62397fccbc6f';

(async () => {
  const b = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,960']
  });

  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 960 });

  await p.goto('http://127.0.0.1:5173');
  await p.evaluate(() => {
    localStorage.setItem('creovate_current_user', JSON.stringify({
      id: 'kai-sterling',
      name: 'Kai Sterling',
      email: 'kai.sterling@creovate.ai',
      role: 'creator',
      verified: true
    }));
  });

  await p.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Navigate to Direct Messages
  await p.evaluate(() => {
    const navLinks = Array.from(document.querySelectorAll('aside nav button'));
    const msgBtn = navLinks.find(b => b.innerText.includes('Direct Messages') || b.innerText.includes('Messages'));
    if (msgBtn) msgBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Screenshot Dark Mode Chat (clean state, no static fake messages)
  await p.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_chat_clean_dark.png') });

  // 2. Type and send a live message
  await p.type('input[placeholder="Type a message..."]', 'Hi Marcus, excited to collaborate on the solar glass campaign. I can review the storyboard today!');
  await p.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot after sending live message in Dark Mode
  await p.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_chat_sent_dark.png') });

  // 3. Switch to Light Mode via UI
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
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot in Light Mode
  await p.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_chat_sent_light.png') });

  // 4. Navigate back to Creator Studio dashboard in Light Mode
  await p.evaluate(() => {
    const navLinks = Array.from(document.querySelectorAll('aside nav button'));
    const dashBtn = navLinks.find(b => b.innerText.includes('Creator Dashboard') || b.innerText.includes('Dashboard'));
    if (dashBtn) dashBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await p.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_dashboard_light_mode.png') });

  // 5. Scroll down to verify sticky sidebar in Light Mode
  await p.evaluate(() => window.scrollBy(0, 500));
  await new Promise(r => setTimeout(r, 600));

  await p.screenshot({ path: path.join(ARTIFACTS_DIR, 'final_scroll_sticky_light.png') });

  console.log('All final chat and light mode screenshots captured successfully!');
  await b.close();
})();
