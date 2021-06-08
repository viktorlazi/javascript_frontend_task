const brands = require('./db/brands.json');
const products = require('./db/products.json');

const jsonServer = require('json-server');
const server = jsonServer.create();
//const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
 
server.use(middlewares);
//server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
})

server.get('/products', (req, res) =>{
  res.json(products);
});
server.get('/brands', (req, res) =>{
  res.json(brands);
});