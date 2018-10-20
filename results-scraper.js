// var express = require('express');
// var fs = require('fs');
// var request = require('request');
// var cheerio = require('cheerio');
// var app = express();

const cheerioTableparser = require('cheerio-tableparser');
const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `http://www.besttimescct.com/results/5K-results-by-place-2017.HTML`,
  transform: function (body) {
    console.log(body)
    return cheerio.load(body);
  }
};

rp(options)
    .then(($) => {
      // console.log($('.main'));
    })
    .catch((err) => {
      console.log(err);
    });
