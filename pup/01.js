const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    // 运行 Chromium 或 Chrome 可执行文件的路径（相对路径）
    executablePath: '/Users/ys/chrome-mac/Chromium.app/Contents/MacOS/Chromium', 
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1400,
    height: 800,
    deviceScaleFactor: 1,
  })

  // page.once('load', () => {
  //   await page.screenshot({
  //     path: './test.png',
  //     fullPage: true
  //   });
  //   browser.close();
  // });


  page.once('load', async () => {
    let e = await page.$('.header_login > span');
    await e.click();
  });

  await page.goto('https://daxue.58.com');
})();

