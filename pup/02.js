const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];


(async () => {
  const browser = await puppeteer.launch({
    // 运行 Chromium 或 Chrome 可执行文件的路径（相对路径）
    executablePath: '/Users/ys/chrome-mac/Chromium.app/Contents/MacOS/Chromium', 
    headless: false
  });

  const page = await browser.newPage();
  await page.emulate(iPhone);


  page.once('load', async () => {
    console.log("onload...");
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
  });

  await page.goto('https://daxue.58.com');
})();

