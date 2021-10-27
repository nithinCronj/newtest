const http = require('http')
const url =require('url')
const produncts = require ('./products.json');

//const getProducts= require('./control')
//const getProduct= require('./control')
//const { getProducts, getProduct }= require('./control')

http.createServer((req, res) => {
    if(req.url === '/' && req.method==='GET'){
res.writeHead(200, {'Content-Type':'application/json'})
res.end(JSON.stringify(produncts));
// //res.end();
 } 
 else if( req.method==='GET' && req.url=='/login:id') {
     //console.log(req.url);
   //  const id= req.url.split('/')[2]
//     getProduct(req, res, id);
console.log("test",id);
 }
 else {
    res.writeHead(404, {'Content-Type':'application/json'})
    res.end('Page not found')
 }


}).listen(8080)