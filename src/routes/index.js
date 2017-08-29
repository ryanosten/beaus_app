'use strict'

const express = require('express');
const router = express.Router();
const request = require('request-promise');

//handle get request to '/ route
router.get('/', (req, res) => {
  //make api call
  request('http://lcboapi.com/products?q=Beau%27s+All+Natural+Brewing&where=is_seasonal')
    .then(function(response){
      let beers = [];
      let beer_json = JSON.parse(response).result;

      for(let item of beer_json){
        if(item.tertiary_category !== "Taster Pack" && item.image_thumb_url !== null){
          let beer_obj = {}
          beer_obj.name = item.name;
          beer_obj.thumbnail = item.image_thumb_url;
          beer_obj.id = item.id;
          beers.push(beer_obj);
        }
      }
    res.render('index', {beers: beers});
    });
});

router.get('/products/:id', (req, res) => {
  var id = req.params.id;
  request(`http://lcboapi.com/inventories?product_id=${id}`)
    .then(function(response){
      let beer_json = JSON.parse(response).product;
      let stores_json = JSON.parse(response).result;
      let beer = {
        name: beer_json.name,
        image: beer_json.image_url,
        description: beer_json.description
      }

      let stores = [];
      for(let item of stores_json){
        let store_id = item.store_id;
        request(`http://lcboapi.com/stores/${store_id}`)
          .then(function(response){
            let store_json = JSON.parse(response).result;
            let store_obj = {
              name: store_json.name,
              address: store_json.address_line_1,
              city: store_json.city,
              postal_code: store_json.postal_code,
              telephone: store_json.telephone
            }
            stores.push(store_obj);
          })
      }
      res.render('products', {beer: beer, stores: stores});
    });
})

module.exports = router;
