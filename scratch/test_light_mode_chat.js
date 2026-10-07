import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://127.0.0.1:5173';

async function testLightMode() {
  // Pre-authenticate in Node
  const authRes = await fetch('http://127.0.0.1:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'marcus@solariaenergy.com',
      password: 'password123'
    })
  });
  const auth = await authRes.json();
  console.log('Pre-auth in Node:', auth.success, auth.account?.name);

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    // Set credentials and theme
    await page.evaluate((account, token) => {
      localStorage.setItem('creovate_theme', 'light');
      localStorage.setItem('creovate_auth_token', token);
      localStorage.setItem('creovate_current_user', JSON.stringify(account));
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      document.documentElement.setAttribute('data-theme', 'light');
    }, auth.account, auth.token);

    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Navigate to Direct Messages
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('aside nav button'));
      const dmBtn = buttons.find(b => b.innerText.includes('Direct Messages'));
      if (dmBtn) dmBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Take screenshot of empty / hub state in Light Mode
    await page.screenshot({ path: 'scratch/light_mode_direct_messages_hub.png' });
    console.log('Saved scratch/light_mode_direct_messages_hub.png');

    // Open modal via header button
    await page.click('#new-direct-message-btn');
    await new Promise(r => setTimeout(r, 800));

    // Select first creator in modal
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('form div.cursor-pointer'));
      if (items[0]) items[0].click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Type message in modal
    await page.type('textarea', 'Hello Kai, Solaria Clean Tech would like to commission a 4K AI video for our solar glass launch.', { delay: 10 });
    await new Promise(r => setTimeout(r, 400));

    // Submit
    await page.click('#confirm-send-real-chat-btn');
    await new Promise(r => setTimeout(r, 1500));

    // Take screenshot of active chat in Light Mode
    await page.screenshot({ path: 'scratch/light_mode_active_chat.png' });
    console.log('Saved scratch/light_mode_active_chat.png');

    // Send a live reply in chat
    await page.type('input[placeholder="Type a message..."]', 'Can you deliver the first draft by next Friday?');
    await page.click('form button[type="submit"]');
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({ path: 'scratch/light_mode_chat_sent.png' });
    console.log('Saved scratch/light_mode_chat_sent.png');

    console.log('Light Mode direct messaging test complete!');
  } finally {
    await browser.close();
  }
}

testLightMode();
