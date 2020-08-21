 // Crawler
 const puppeteer = require('puppeteer');
 const CronJob = require('cron').CronJob;
 const urlParam='https://www.screenal.gr/en/product_category/insect-screens/';
  var express = require('express');
 
  var app = express();
  var mysql=require('mysql');
  let con = mysql.createConnection({
      //properties
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sampleDB',
      //port:"8889",
  });
 
  let hashValue='';
  //scrapeProduct();
 
 
  async function configureBrowser()
  {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(urlParam);
      return page;
  }
 
  async function scrapeProduct(page) {
 
      const [el] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[1]/a/img');
      const src = await el.getProperty('src');
      const imgURL = await src.jsonValue();
 
      const [el1] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[1]/h4/a');
      const txt = await el1.getProperty('textContent');
      const title = await txt.jsonValue();
 
      const [el2] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[2]/a/img');
      const src2 = await el2.getProperty('src');
      const imgURL2 = await src2.jsonValue();
 
      const [el3] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[2]/h4/a');
      const txt3 = await el3.getProperty('textContent');
      const title3 = await txt3.jsonValue();
 
      const [el5] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[3]/a/img');
      const src5 = await el5.getProperty('src');
      const imgURL5 = await src5.jsonValue();
 
      const [el4] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[3]/h4/a');
      const txt4 = await el4.getProperty('textContent');
      const title4 = await txt4.jsonValue();
 
      const [el6] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[4]/a/img');
      const src6 = await el6.getProperty('src');
      const imgURL6 = await src6.jsonValue();
 
      const [el7] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[4]/h4/a');
      const txt7 = await el7.getProperty('textContent');
      const title7 = await txt7.jsonValue();
 
      const [el8] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[5]/a/img');
      const src8 = await el8.getProperty('src');
      const imgURL8 = await src8.jsonValue();
 
      const [el9] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[5]/h4/a');
      const txt9 = await el9.getProperty('textContent');
      const title9 = await txt9.jsonValue();
 
      const [el10] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[6]/a/img');
      const src10 = await el10.getProperty('src');
      const imgURL10 = await src8.jsonValue();
 
      const [el11] = await page.$x('//*[@id="inner-page"]/div/article/ul/li[6]/h4/a');
      const txt11 = await el11.getProperty('textContent');
      const title11 = await txt11.jsonValue();
 
      var data = "console.log([imgURL, title, imgURL2, title3,imgURL5, title4, imgURL6, title7, imgURL8, title9, imgURL10, title11])";
 
      //timer
      var crypto = require('crypto');
      hashValue = crypto.createHash('md5').update(data).digest('hex');
      console.log(hashValue);
 
  }
 
  function insertHash()
  {
      var sql = "INSERT INTO testing (hashvalue) VALUES (?)";
      con.query(sql, hashValue, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
      });
 
  }
 
  function updateHash()
  {
      var sql="UPDATE `testing` SET `hashvalue`=?"
      //var sql = "INSERT INTO testing (hashvalue) VALUES (?)";
      //var hashValue="testing";
      con.query(sql, hashValue, function (err, result) {
          if (err) throw err;
          console.log("1 record updated");
      });
  }
 
  function performCheck()
  {
      con.query("Select hashvalue FROM testing",function (error,rows,fields) {
          if(!!error)
          {
              console.log("Error in query");
          }
          else
          {
              // console.log("Works");
              //Running first time
              console.log("Test "+hashValue);
              if(rows==null)
              {
                  insertHash();
 
              }
 
              else if(hashValue===(rows[0].hashvalue))
              {
                  console.log("Works1");
                 // resp.json("Hash value is same");
                  console.log("Hash value is same");
 
              }
              else
              {
 
                  //call update method
                  updateHash();
 
                  //resp.json(rows);
                  console.log("rows");
              }
 
          }
 
      });
  }
 
 
 async function tracking()
 {
 
     const  page= await configureBrowser();
     var CronJob = require('cron').CronJob;
     var job = new CronJob('20 * * * * *', function() {
         console.log('You will see this message every 20 second');
         scrapeProduct(page);
         performCheck();
     }, null, true,null,null,true);
     job.start();
 }
 
 tracking();
 
 
 
  app.listen(1227,()=>console.log("Server is running"));