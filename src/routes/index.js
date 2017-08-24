'use strict'

const express = require('express');
const router = express.Router();
//const request = require('request');
const rp = require('request-promise');

//handle get request to '/ route
router.get('/', (req, res) => {
  rp('https://lcboapi.com/products?access_key=MDowZTFmMjc3OC04ODY3LTExZTctYjc2Ni01M2UxOGZkOWJiYWY6SHR5NGFDU0FldmFPVnJCdDU1SWJWTjZXVmh3WTRHY1lFWkZy&q=Beau%27s+All+Natural+Brewing&where=is_seasonal')
    .then(function(response){
      console.log(response);
    });
  res.render('index');
  //make api call
  //package object
  //pass object to view
  //render view
});

module.exports = router;
