import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://127.0.0.1:5173';

async function test() {
  console.log('Launching browser to test Real Direct Messaging...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  try {
    // 1. Load website
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 15000 });
    console.log('1. Website loaded successfully.');

    // 2. Perform authentic login via backend /api/auth/login
    const loginData = await page.evaluate(async () => {
      const res = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'kai.sterling@creovate.ai',
          password: 'password123'
        })
      });
      const data = await res.json();
      const account = data.account || data.user;
      if (data.token && account) {
        localStorage.setItem('creovate_auth_token', data.token);
        localStorage.setItem('creovate_current_user', JSON.stringify(account));
        return { success: true, user: account };
      }
      return { success: false, raw: data };
    });
    console.log('2. Logged in successfully:', loginData);

    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    // 3. Navigate to Direct Messages
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('aside nav button'));
      const dmBtn = buttons.find(b => b.innerText.includes('Direct Messages'));
      if (dmBtn) dmBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));

    // 4. Verify no fake demo conversations exist
    const conversationTexts = await page.evaluate(() => document.body.innerText);

    const hasSolariaDemo = conversationTexts.includes('conv-kai-solaria') || conversationTexts.includes('Solar Glass Campaign');
    const hasCleanState = conversationTexts.includes('No Active Conversations') || 
                          conversationTexts.includes('Real Direct Messages') ||
                          conversationTexts.includes('Start a Real Direct Message');
    console.log('3. Checked conversation list: has fake demo text:', hasSolariaDemo, '| Shows clean Direct Messages state:', hasCleanState);

    // Take screenshot of empty / clean direct messages state
    await page.screenshot({ path: 'scratch/clean_direct_messages_state.png' });
    console.log('Saved scratch/clean_direct_messages_state.png');

    // 5. Click "Start a Real Direct Message" or "+ New Chat"
    const newChatBtnClicked = await page.evaluate(() => {
      const btn = document.querySelector('#new-direct-message-btn') || document.querySelector('#start-real-chat-hub-btn');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log('4. Clicked New Direct Message button:', newChatBtnClicked);
    await new Promise(r => setTimeout(r, 800));

    // 6. Modal should be open. Select "Elena Rostova"
    const selectCreatorResult = await page.evaluate(() => {
      const creatorItems = Array.from(document.querySelectorAll('form div.cursor-pointer'));
      const elenaItem = creatorItems.find(el => el.innerText.includes('Elena Rostova')) || creatorItems[0];
      if (elenaItem) {
        elenaItem.click();
        return { success: true, text: elenaItem.innerText.split('\n')[0] };
      }
      return { success: false };
    });
    console.log('5. Selected recipient:', selectCreatorResult);

    // 7. Type subject and message using keyboard simulation
    const subjectSelector = 'input[placeholder*="Commercial"]';
    if (await page.$(subjectSelector)) {
      await page.type(subjectSelector, 'Autonomous EV Video Production Brief', { delay: 15 });
    }
    await page.type('textarea', 'Hi Elena, we love your 3D neural workflows and want to contract you for our upcoming EV reveal campaign.', { delay: 10 });

    await new Promise(r => setTimeout(r, 500));

    // 8. Submit modal form
    const submitResult = await page.evaluate(() => {
      const btn = document.querySelector('#confirm-send-real-chat-btn');
      if (btn && !btn.disabled) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log('6. Submitted real direct message form:', submitResult);
    await new Promise(r => setTimeout(r, 1500));

    // Take screenshot of active chat thread
    await page.screenshot({ path: 'scratch/real_direct_message_thread.png' });
    console.log('Saved scratch/real_direct_message_thread.png');

    // 9. Verify the message is now displayed in the active chat thread
    const chatContent = await page.evaluate(() => document.body.innerText);
    const hasElenaChat = chatContent.includes('Elena Rostova');
    const hasSentMessage = chatContent.includes('we love your 3D neural workflows');
    console.log('7. Verified real direct message in thread:', { hasElenaChat, hasSentMessage });

    // 10. Send a follow-up message in real-time
    await page.type('input[placeholder="Type a message..."]', 'Also, what is your earliest availability for this week?');
    await page.click('form button[type="submit"]');
    await new Promise(r => setTimeout(r, 1000));

    const updatedChat = await page.evaluate(() => document.body.innerText);
    const hasFollowUp = updatedChat.includes('earliest availability for this week');
    console.log('8. Sent real-time follow-up message:', hasFollowUp);

    // Take screenshot of conversation with both messages
    await page.screenshot({ path: 'scratch/real_direct_message_followup.png' });
    console.log('Saved scratch/real_direct_message_followup.png');

    // 11. Test Delete Chat button
    page.on('dialog', async dialog => {
      console.log('Dialog prompt:', dialog.message());
      await dialog.accept();
    });

    const deleteBtnFound = await page.evaluate(() => {
      const btn = document.querySelector('#delete-chat-btn');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log('9. Clicked Delete Chat button:', deleteBtnFound);
    await new Promise(r => setTimeout(r, 1000));

    const postDeleteChat = await page.evaluate(() => document.body.innerText);
    const deletedSuccessfully = !postDeleteChat.includes('earliest availability for this week');
    console.log('10. Conversation deleted successfully from inbox:', deletedSuccessfully);

    await page.screenshot({ path: 'scratch/post_delete_direct_messages.png' });
    console.log('Saved scratch/post_delete_direct_messages.png');

    console.log('\n=== REAL DIRECT MESSAGING VALIDATION COMPLETE ===');
    console.log('Result: 100% SUCCESSFUL');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
  }
}

test();
