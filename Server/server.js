const products = require('./models/products.json');
const brands = require('./models/brands.json');

const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const port = process.env.PORT || 3001;

app.get('/products', (req, res)=>{
  res.json(products);
}); 
app.get('/brands', (req, res)=>{
  res.json(brands);
});

app.delete('/products/:id', (req, res)=>{
  const file = fs.readFileSync('./models/products.json');
  let json = JSON.parse(file);
  json = json.filter((e) => { return e.id != req.params.id });
  fs.writeFileSync('./models/products.json', JSON.stringify(json, null, 2));
  res.json({});
});
app.post('/products', (req, res)=>{
  const file = fs.readFileSync('./models/products.json');
  let json = JSON.parse(file);
  json.push(req.body);
  fs.writeFileSync('./models/products.json', JSON.stringify(json, null, 2));
  res.json({});
});
app.put('/products', (req, res)=>{
  const file = fs.readFileSync('./models/products.json');
  let json = JSON.parse(file);
  const index = json.findIndex(obj => obj.id === req.body.id);
  json[index] = req.body.edited;
  fs.writeFileSync('./models/products.json', JSON.stringify(json, null, 2));
  res.json({});
});


app.listen(port);
console.log('Running on port ' + port);