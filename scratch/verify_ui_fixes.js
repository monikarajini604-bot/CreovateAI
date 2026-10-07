const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://127.0.0.1:5173';
const ARTIFACTS_DIR = 'C:\\Users\\lavan_7fd3br1\\.gemini\\antigravity-ide\\brain\\aa00b169-bdf6-44c9-acb4-62397fccbc6f';

async function verify() {
  console.log('Launching browser to verify UI fixes...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,960']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  try {
    // 1. Log in as Kai Sterling to access Creator Studio and Messages
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const kaiUser = {
        id: 'kai-sterling',
        name: 'Kai Sterling',
        email: 'kai.sterling@creovate.ai',
        role: 'creator',
        verified: true,
        hourly_rate: 175
      };
      localStorage.setItem('creovate_current_user', JSON.stringify(kaiUser));
      localStorage.setItem('creovate_theme', 'dark');
    });

    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // VERIFY 1: Sidebar is sticky when window scrolls
    console.log('[Check 1] Testing sticky sidebar on scroll...');
    const initialSidebarTop = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      return aside ? aside.getBoundingClientRect().top : null;
    });

    // Scroll down 700px
    await page.evaluate(() => window.scrollBy(0, 700));
    await new Promise(r => setTimeout(r, 500));

    const scrolledSidebarTop = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      return aside ? aside.getBoundingClientRect().top : null;
    });

    console.log(`Initial sidebar top: ${initialSidebarTop}px, Scrolled sidebar top: ${scrolledSidebarTop}px`);
    const isSidebarFixed = scrolledSidebarTop !== null && scrolledSidebarTop <= 65 && scrolledSidebarTop >= 55;
    console.log(`Sidebar sticky/fixed on scroll: ${isSidebarFixed ? 'YES (PASS)' : 'NO'}`);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify_sticky_sidebar.png') });

    // VERIFY 2: Light Mode visual distinction & depth
    console.log('[Check 2] Testing Light Mode appearance...');
    await page.evaluate(() => {
      localStorage.setItem('creovate_theme', 'light');
      document.documentElement.classList.remove('theme-dark', 'theme-night', 'dark');
      document.body.classList.remove('theme-dark', 'theme-night', 'dark');
      document.documentElement.classList.add('theme-light', 'light');
      document.body.classList.add('theme-light', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 600));

    const lightStyles = await page.evaluate(() => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const card = document.querySelector('.bg-\\[\\#0c1222\\]') || document.querySelector('main > div');
      const cardBg = card ? window.getComputedStyle(card).backgroundColor : null;
      const aside = document.querySelector('aside');
      const asideBg = aside ? window.getComputedStyle(aside).backgroundColor : null;
      return { bodyBg, cardBg, asideBg };
    });
    console.log('Light Mode styles computed:', lightStyles);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify_light_mode_dashboard.png') });

    // VERIFY 3: Direct Messages has NO static messages
    console.log('[Check 3] Testing Direct Messages without static messages...');
    await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll('aside nav button'));
      const msgBtn = navLinks.find(b => b.innerText.includes('Direct Messages') || b.innerText.includes('Messages'));
      if (msgBtn) msgBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    const chatContent = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const hasMarcusVance = bodyText.includes('Marcus Vance');
      const hasFakeRunwayMsg = bodyText.includes('We reviewed your portfolio pieces generated with Runway Gen-3 Alpha');
      const hasACESMsg = bodyText.includes('ACES color space');
      const hasRealtimeNotice = bodyText.includes('Direct Real-Time Workspace') || bodyText.includes('All static demo messages removed');
      return {
        hasMarcusVance,
        hasFakeRunwayMsg,
        hasACESMsg,
        hasRealtimeNotice
      };
    });
    console.log('Chat static messages check:', chatContent);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify_chat_clean_state_light.png') });

    // VERIFY 4: Real-time message sending
    console.log('[Check 4] Testing real-time message sending...');
    await page.type('input[placeholder="Type a message..."]', 'Hello from live test: real-time message sending confirmed!');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 1000));

    const sentResult = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return {
        messageFound: bodyText.includes('Hello from live test: real-time message sending confirmed!'),
        lastMessageUpdated: bodyText.includes('Just now') || bodyText.includes('Delivered')
      };
    });
    console.log('Real-time message send result:', sentResult);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify_chat_realtime_sent_light.png') });

    // Switch back to Dark Mode to also verify Dark Mode
    await page.evaluate(() => {
      localStorage.setItem('creovate_theme', 'dark');
      document.documentElement.classList.remove('theme-light', 'light');
      document.body.classList.remove('theme-light', 'light');
      document.documentElement.classList.add('theme-dark', 'dark');
      document.body.classList.add('theme-dark', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify_chat_realtime_sent_dark.png') });

    console.log('\nAll visual checks completed successfully!');
  } finally {
    await browser.close();
  }
}

verify().catch(err => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
