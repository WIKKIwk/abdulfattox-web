import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    const text = await page.evaluate(() => {
        const el = document.getElementById('stat-num-1');
        return el ? el.innerHTML : 'No element';
    });
    console.log('stat-num-1 innerHTML:', text);
    const parentText = await page.evaluate(() => {
        const el = document.querySelector('.stat-item .stat-number');
        return el ? el.innerHTML : 'No element';
    });
    console.log('stat-number innerHTML:', parentText);
    await browser.close();
})();
