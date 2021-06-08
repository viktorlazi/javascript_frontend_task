const products = require('./models/products.json');
const brands = require('./models/brands.json');

const fs = require('fs');
const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

app.get('/products', (req, res)=>{
  res.json(products);
});
app.get('/brands', (req, res)=>{
  res.json(brands);
});

app.get('/products/:id', (req, res)=>{
  var removeID = req.params.id;
  var data = fs.readFileSync('./models/products.json');
  var json = JSON.parse(data);
  var prdcts = json.products;
  json.products = prdcts.filter((e) => { return e.id != removeID });
  fs.writeFileSync('./models/products.json', JSON.stringify(json, null, 2));
  res.json({});
});


app.listen(port);
console.log('Running on port ' + port);