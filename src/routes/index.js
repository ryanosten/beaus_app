'use strict'

const express = require('express');
const router = express.Router();
//const request = require('request');
const request = require('request-promise');

//handle get request to '/ route
router.get('/', (req, res) => {
  //make api call
  request('https://lcboapi.com/products?access_key=MDowZTFmMjc3OC04ODY3LTExZTctYjc2Ni01M2UxOGZkOWJiYWY6SHR5NGFDU0FldmFPVnJCdDU1SWJWTjZXVmh3WTRHY1lFWkZy&q=Beau%27s+All+Natural+Brewing&where=is_seasonal')
    .then(function(response){
      let beers = [];
      let beer_json = JSON.parse(response).result;

      for(let item of beer_json){
        if(item.tertiary_category !== "Taster Pack" && item.image_thumb_url !== null){
          let beer_obj = {}
          beer_obj.name = item.name;
          beer_obj.thumbnail = item.image_thumb_url;
          beers.push(beer_obj);
        }
      }
    res.render('index', {beers: beers});
    });
});

module.exports = router;
