// Workgin sitemapper
const minimist = require('minimist');
const Sitemapper = require('sitemapper');

const sitemap = new Sitemapper();

const argv = minimist(process.argv.slice(2));

// Help logic
if (argv._.length !== 1) {
  printHelp();
}
function printHelp() {
  console.log(`Usage: node sitemapper.js [sitemap url]`);
  process.exit(1);
}

const sitemapUrl = argv._[0];

(async() => {

  // Fetch sitemap
  let { url, sites } = await sitemap.fetch(sitemapUrl);

  for (let url of sites) {
    console.log(url);
  }

})();
// March 24, 2018
process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  console.error(reason, p);
  process.exit(1);
});

const fs = require('fs');
// const minimist = require('minimist');
// const Sitemapper = require('sitemapper');
const puppeteer = require('puppeteer');
// const filenamify = require('filenamify')

const urls = require('./urls.js');
const devices = require('./devices.js');

(async () => {
  let screenshotDirectory = './screenshots/';
  if (!fs.existsSync(screenshotDirectory)){
    fs.mkdirSync(screenshotDirectory);
  }

  let browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  let page = await browser.newPage();

  for (let i = 0, len = devices.length; i < len; i++) {
    let device = devices[i];

    // Set device options
    await page.setViewport({
      width: device.width,
      height: device.height,
      isMobile: device.mobile,
      hasTouch: device.touch,
      deviceScaleFactor: device.deviceScaleFactor
    });
    await page.setUserAgent(device.userAgent)

    let deviceDirectory = screenshotDirectory;
    if (!fs.existsSync(deviceDirectory)){
      fs.mkdirSync(deviceDirectory);
    }

    for (let j = 0, len = urls.length; j < len; j++) {
      let url = urls[j];
      let pageSlug = page.url();
      const pageTitle = await page.title();
      console.log(pageSlug);
      let imageName = device.width + '-' + pageTitle + '.png';

      // Load page and create full page screenshot
      await page.goto(url, {waitUntil: 'networkidle2'});
      await page.screenshot({path: deviceDirectory + imageName, fullPage: true});
    }
  }

  await browser.close();
})();

//
process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, p);
    process.exit(1);
});
let devices = [
  {
    deviceName: "iPhone 5",
    width: 320,
    height: 568,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    touch: true,
    mobile: true
  },
	{
    deviceName: "iPad",
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    touch: true,
    mobile: true
  },
  {
    deviceName: "Laptop with HiDPI screen",
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    userAgent: "",
    touch: false,
    mobile: false
  }
];
let urls = [
	'https://www.alloy.work/marjolijn/blog/',
	'https://www.alloy.work/marjolijn/theater/zohre-uitverkocht/',
// 	'https://www.alloy.work/marjolijn/blog/',
// 	'https://www.alloy.work/marjolijn/',
// 	'https://www.alloy.work/marjolijn/agenda/',
// 	'https://www.alloy.work/marjolijn/antwoordt/',
// 	'https://www.alloy.work/marjolijn/content-setup/',
// 	'https://www.alloy.work/marjolijn/over/',
// 	'https://www.alloy.work/marjolijn/presenteert/',
// 	'https://www.alloy.work/marjolijn/speelt/',
// 	'https://www.alloy.work/marjolijn/schrijft/',
// 	'https://www.alloy.work/marjolijn/is/',
// 	'https://www.alloy.work/marjolijn/speelt/zohre/',
// 	'https://www.alloy.work/marjolijn/speelt/bouta/',
// 	'https://www.alloy.work/marjolijn/speelt/mahabharata/',
// 	'https://www.alloy.work/marjolijn/speelt/family-81/',
// 	'https://www.alloy.work/marjolijn/speelt/jeremia/',
// 	'https://www.alloy.work/marjolijn/speelt/garry-davis/',
// 	'https://www.alloy.work/marjolijn/speelt/ondervlakte/',
// 	'https://www.alloy.work/marjolijn/speelt/als-ik-de-liefde-niet-heb/',
// 	'https://www.alloy.work/marjolijn/speelt/kruistocht/',
// 	'https://www.alloy.work/marjolijn/speelt/bommenneef/',
// 	'https://www.alloy.work/marjolijn/schrijft/en-noemen-hem/',
// 	'https://www.alloy.work/marjolijn/schrijft/het-groeit-het-leeft/',
// 	'https://www.alloy.work/marjolijn/schrijft/meer-hoef-dan-voet/',
// 	'https://www.alloy.work/marjolijn/schrijft/land-van-werk-en-honing/',
// 	'https://www.alloy.work/marjolijn/schrijft/als-mozes-doorgevraagd/',
// 	'https://www.alloy.work/marjolijn/schrijft/de-laatste-aedema/'
]
// const fs = require('fs');
const puppeteer = require('puppeteer');
// const filenamify = require('filenamify')

// const urls = require('./urls.js');
// const devices = require('./devices.js');

(async () => {
    let screenshotDirectory = './screenshots/';
    // if (!fs.existsSync(screenshotDirectory)){
    //     fs.mkdirSync(screenshotDirectory);
    // }

    let browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();

    for (let i = 0, len = devices.length; i < len; i++) {
      let device = devices[i];

      // Set device options
      await page.setViewport({
          width: device.width,
          height: device.height,
          isMobile: device.mobile,
          hasTouch: device.touch,
          deviceScaleFactor: device.deviceScaleFactor
      });
      await page.setUserAgent(device.userAgent)

      let deviceDirectory = screenshotDirectory;

      for (let j = 0, len = urls.length; j < len; j++) {
          let url = urls[j];
					let pageTitle = await page.title();
          let imageName = device.deviceName +  pageTitle + '.png';

          // Load page and create full page screenshot
          await page.goto(url, {waitUntil: 'networkidle2'});
          await page.screenshot({path: deviceDirectory + imageName, fullPage: true});
      }
    }

    await browser.close();
})();

// Genereate a whole list and a list of devices
process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, p);
    process.exit(1);
});
let devices = [
  {
    deviceName: "iPhone 5",
    width: 320,
    height: 568,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    touch: true,
    mobile: true
  },
	{
    deviceName: "iPad",
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    touch: true,
    mobile: true
  },
  {
    deviceName: "Laptop with HiDPI screen",
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    userAgent: "",
    touch: false,
    mobile: false
  }
];
let urls = [
	'https://www.alloy.work/marjolijn/blog/',
	'https://www.alloy.work/marjolijn/theater/zohre-uitverkocht/',
	'https://www.alloy.work/marjolijn/blog/',
	'https://www.alloy.work/marjolijn/',
	'https://www.alloy.work/marjolijn/agenda/',
	'https://www.alloy.work/marjolijn/antwoordt/',
	'https://www.alloy.work/marjolijn/content-setup/',
	'https://www.alloy.work/marjolijn/over/',
	'https://www.alloy.work/marjolijn/presenteert/',
	'https://www.alloy.work/marjolijn/speelt/',
	'https://www.alloy.work/marjolijn/schrijft/',
	'https://www.alloy.work/marjolijn/is/',
	'https://www.alloy.work/marjolijn/speelt/zohre/',
	'https://www.alloy.work/marjolijn/speelt/bouta/',
	'https://www.alloy.work/marjolijn/speelt/mahabharata/',
	'https://www.alloy.work/marjolijn/speelt/family-81/',
	'https://www.alloy.work/marjolijn/speelt/jeremia/',
	'https://www.alloy.work/marjolijn/speelt/garry-davis/',
	'https://www.alloy.work/marjolijn/speelt/ondervlakte/',
	'https://www.alloy.work/marjolijn/speelt/als-ik-de-liefde-niet-heb/',
	'https://www.alloy.work/marjolijn/speelt/kruistocht/',
	'https://www.alloy.work/marjolijn/speelt/bommenneef/',
	'https://www.alloy.work/marjolijn/schrijft/en-noemen-hem/',
	'https://www.alloy.work/marjolijn/schrijft/het-groeit-het-leeft/',
	'https://www.alloy.work/marjolijn/schrijft/meer-hoef-dan-voet/',
	'https://www.alloy.work/marjolijn/schrijft/land-van-werk-en-honing/',
	'https://www.alloy.work/marjolijn/schrijft/als-mozes-doorgevraagd/',
	'https://www.alloy.work/marjolijn/schrijft/de-laatste-aedema/'
]
// const fs = require('fs');
const puppeteer = require('puppeteer');
// const filenamify = require('filenamify')

// const urls = require('./urls.js');
// const devices = require('./devices.js');

(async () => {
    let screenshotDirectory = './screenshots/';
    // if (!fs.existsSync(screenshotDirectory)){
    //     fs.mkdirSync(screenshotDirectory);
    // }

    let browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();

    for (let i = 0, len = devices.length; i < len; i++) {
      let device = devices[i];

      // Set device options
      await page.setViewport({
          width: device.width,
          height: device.height,
          isMobile: device.mobile,
          hasTouch: device.touch,
          deviceScaleFactor: device.deviceScaleFactor
      });
      await page.setUserAgent(device.userAgent)

      let deviceDirectory = screenshotDirectory;

      for (let j = 0, len = urls.length; j < len; j++) {
          let url = urls[j];
          let imageName = j + '.png';

          // Load page and create full page screenshot
          await page.goto(url, {waitUntil: 'networkidle2'});
          await page.screenshot({path: deviceDirectory + imageName, fullPage: true});
      }
    }

    await browser.close();
})();


// With title
'use strict';
const webpageURL = 'http://alloy.work/marjolijn';
const puppeteer = require('puppeteer');

(async() => {

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(webpageURL);
	const pageTitle = await page.title();
	await page.setViewport({width: 320, height: 480});
	await page.screenshot({path: 'screenshots/' + pageTitle + '-mobile.png', fullPage: true});
	await page.setViewport({width: 768, height: 1024});
	await page.screenshot({path: 'screenshots/' + pageTitle + '-ipad.png', fullPage: true});
	await page.setViewport({width: 1366, height: 768});
	await page.screenshot({path: 'screenshots/' + pageTitle + '-desktop.png', fullPage: true});
	await browser.close();

})();

// simple
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://alloy.work/marjolijn');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
