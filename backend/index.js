const express = require('express');
const app = express();
const fetchUrl = require("fetch").fetchUrl;

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl("https://bitcoin.info/", function(error, meta, body){
   let html = body.toString();
   
   let htmlProcessado = html.match(/(?<=\<td>).*(?=\<\/td>)/);

   console.log(html);
});





// const axios = require("axios")
// const cheerio = require("cheerio")
// const request = require('request');





//const Request = require('request');


//  const fetchUrl = require("fetch").fetchUrl;

// fetchUrl("https://finance.yahoo.com/quote/BTC-USD/", function(error, meta, body){
//     console.log(body.match(/(?<=\<h1>).*(?=\<\/h1>)/));
// });

// (async () => {
//    const response = await fetchUrl('https://finance.yahoo.com/quote/BTC-USD/');
//    const text = await response.text();
//    console.log(text);
//    //console.log(text.match(/(?<=\<h1).*(?=\<\/h1>)/));
//  })()

// axios
// 	.get('https://goldprice.org/cryptocurrency-price')
// 	.then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html);

//       let data = $.html();
// 		console.log(html);
// 	})
// 	.catch((error) => {
// 		console.error(error)
// 	});



app.get('/', (req, res) => {
  res.send('Hello World 4!')
});

app.listen(3000, () => {
  console.log(`Express Server is running`)
});