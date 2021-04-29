const cron = require('node-cron');
const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
//const scrapeBitcoin = require('./scrape');

let bitcoin = null;

let bitcoinPrice = async function() {
   const browser = await puppeteer.launch({
      args: ['--lang=en-US']
   });
   const page = await browser.newPage();
   await page.goto('https://www.coindesk.com/price/bitcoin');
   await page.waitForXPath('//*[@id="export-chart-element"]/div/section/div[1]/div[1]/div[2]/div');
   let elHandle = await page.$x('//*[@id="export-chart-element"]/div/section/div[1]/div[1]/div[2]/div');
   let priceString = await page.evaluate(el => el.textContent, elHandle[0]);
   let priceNumber = await Number( priceString.replace(/[^0-9.-]+/g,"") );

   bitcoin = priceNumber;
   await browser.close();
   return priceNumber;
}


//const url = 'mongodb://127.0.0.1:27017/scraper';
const url = 'mongodb+srv://nucamp:nucamp@cluster0.csenz.mongodb.net/scraper?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection
   db.once('open', _ => {
   console.log('Database connected:', url)
   })
   db.on('error', err => {
   console.error('Database connection error:', err)
})

const schema = new mongoose.Schema({ price: 'number' }, { timestamps: true });
const Bitcoin = mongoose.model('Bitcoin', schema);

cron.schedule('*/20 * * * * *', function() {

   bitcoinPrice();   
   console.log(bitcoin);
   const small = new Bitcoin({ price: bitcoin });

   if(!!bitcoin) {
      small.save(function (err) {
         if (err) return handleError(err);
         // saved!
      });
   }

});






app.get('/', function (req, res) {
   res.send('GET request to the homepage')
})
 
// POST method route
app.post('/', function (req, res) {
   res.send('POST request to the homepage')
})

app.get('/bitcoin', function (req, res) {
   res.send('BITCOIN homepage')
})
 

app.listen(3000, () => {
   console.log(`Express Server is running`)
});


