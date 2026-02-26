import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('response', response => {
        if (!response.ok()) console.log('HTTP ERROR:', response.status(), response.url());
    });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    await browser.close();
})();
