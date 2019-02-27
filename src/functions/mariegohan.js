const launchChrome = require('@serverless-chrome/lambda')
const CDP = require('chrome-remote-interface')
const puppeteer = require('puppeteer')

exports.handler = async (event, context, callback) => {
  try {
    const slsChrome = await launchChrome.default();
    const browser = await puppeteer.connect({
      browserWSEndpoint: (await CDP.Version()).webSocketDebuggerUrl
    });
    const page = await browser.defaultBrowserContext().newPage();

    await page.goto('https://mariegohan.com/12650', { waitUntil: 'domcontentloaded' });
    const searchResults = await page.evaluate(() => {
      const ret = [];
      const titles = document.querySelectorAll("h1.entry-title");
      const title = titles[0].innerText;

      // nodeList.forEach(node => {
      //   ret.push(node.innerText);
      // });

      return title;
    });

    return callback(null, {
      statusCode: 200,
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ searchResults: searchResults })
    });
  } catch (err) {
    return callback(err);
  }
}
