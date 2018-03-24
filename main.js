// Error login?
process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  console.error(reason, p);
  process.exit(1);
});

// END Error login?
const fs = require('fs');
const minimist = require('minimist');
const Sitemapper = require('sitemapper');
const puppeteer = require('puppeteer');
// const filenamify = require('filenamify') // Dont need it (yet)

// const urls = require('./urls.js');
const devices = require('./devices.js');

let urls = [];
//------------------------------------------------------//
// Sitemap to list generator
//------------------------------------------------------//
const sitemap = new Sitemapper();

// Logic that collects all the arguments passed to this script and slices everything it doenst need
const argv = minimist(process.argv.slice(2));

// Help logic
if (argv._.length !== 1) { printHelp(); }

function printHelp() {
  console.log(`Usage: node sitemapper.js [sitemap url]`);
  process.exit(1);
}

// Converts sitemap (multiple levels) to a plain list
const sitemapUrl = argv._[0];

(async() => {

  // Fetch sitemap
  let { url, sites } = await sitemap.fetch(sitemapUrl);

  for (let url of sites) {
    urls.push(url);
    console.log('extracted: ' + url);
    console.log(urls.length);
  }

  startGenerating();

})();
//------------------------------------------------------//
// END Sitemap to list generator
//------------------------------------------------------//

//------------------------------------------------------//
// Screenshot generator
//------------------------------------------------------//
function startGenerating() {

  urls = ['http://studioalloy.nl']; // ⚠️ For testing purposes only

  (async () => {
    let screenshotDirectory = './screenshots/';
    // if (!fs.existsSync(screenshotDirectory)){
    //   fs.mkdirSync(screenshotDirectory);
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

      // let deviceDirectory = screenshotDirectory;
      // if (!fs.existsSync(deviceDirectory)){
      //   fs.mkdirSync(deviceDirectory);
      // }

      for (let j = 0, len = urls.length; j < len; j++) {

        let url = urls[j];

        console.log('Generating 🖼  for ' + device.deviceName + ' ' + url);

        // Remove domain name from url and set file name
        let convertURL = url;
        convertURL = convertURL.replace(/^.*\/\/[^\/]+/, '');
        convertURL = convertURL.split('/');
        convertURL = convertURL.filter(Boolean);
        convertURL = convertURL.join('_');
        // END Remove domain name from url and set file name
        // let pageSlug = page.url();
        // const pageTitle = await page.title();
        // console.log(pageSlug);
        let imageName = device.width + '-' + convertURL + '.jpg';

        // Load page and create full page screenshot
        await page.goto(url, {waitUntil: 'networkidle2'});
        await page.screenshot({path: screenshotDirectory + imageName, fullPage: true});

      }
    }
    console.log('✅  Should have generated ' + urls.length * devices.length + 'images.');

    await browser.close();
  })();

}
//------------------------------------------------------//
// END Screenshot generator
//------------------------------------------------------//
