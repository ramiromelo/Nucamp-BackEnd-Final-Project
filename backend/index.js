const cron = require('node-cron');
const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const scrapeBitcoin = require('./scrape');

// async function scrapeBitcoin() {
//    const browser = await puppeteer.launch({
//       args: ['--lang=en-US']
//   });
//    const page = await browser.newPage();
//    await page.goto('https://www.coindesk.com/price/bitcoin');
//    await page.waitForXPath('//*[@id="export-chart-element"]/div/section/div[1]/div[1]/div[2]/div');
//    let elHandle = await page.$x('//*[@id="export-chart-element"]/div/section/div[1]/div[1]/div[2]/div');
//    let bitcoinPrice = await page.evaluate(el => el.textContent, elHandle[0]);
//    console.log('Bitcoin Price:', Number( bitcoinPrice.replace(/[^0-9.-]+/g,"") ) );
//    await browser.close();
//    return bitcoinPrice;
// }

//Cron Every two minutes
cron.schedule('*/30 * * * * *', function() {

   scrapeBitcoin();

});






app.get('/', (req, res) => {
   res.send('Hello World 4!')
 });
 
 app.listen(3000, () => {
   console.log(`Express Server is running`)
 });


