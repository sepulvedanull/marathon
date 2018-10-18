var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
// var cheerioTableparser = require('cheerio-tableparser');


url = 'http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML';

request(url, function (error, response, html) {
  if (!error) {
    var $ = cheerio.load(html);
    console.log(cheerio.load(html));
  }
})


module.exports = app;