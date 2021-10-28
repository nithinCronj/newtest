const express = require('express');
const produncts =require('./products.json')
const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
    console.error(error);
    });

const app = express()
var cors = require("cors");
app.use(cors());
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
 res.send(JSON.stringify(produncts));
})


app.post("/addEmp", (req,res)=>
{
    //console.log(req.body);
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const employee={
        id: id,
        name: name,
        age:age
    }
    client.set(id, JSON.stringify(employee), redis.print);
    res.send({success:true})
})


app.get("/getEmp/:id", (req,res)=>{
    const id= req.param("id");
    console.log(id);
    client.get(id,(err,data)=>{
   
        console.log(data);
        //console.log(req.param("id"));
        res.send(JSON.parse(data))          
    
        })
})




const admin = {name:"nithi",pass:"123"}

app.post("/login", (req,res)=>{
    const name= req.body.name;
    const password = req.body.password;
console.log(name,password);
if(name == admin.name && password==admin.pass){
res.send({success: true})
}
else{
    res.send({success:false})
}
})

app.delete("/deleteEmp/:id", (req, res) => {
const id=req.param("id");
client.get(id,(err, data)=>
{
    console.log(data);
   // delete data(id)
    res.send({success:true})
    
})

}) 

app.put("/editEmp/:id", (req, res) =>{
    const id=req.param("id");
    client.get(id,(err, data)=>
    { 
        console.log(data);
       // delete data(id)
        res.send({success:true})
       
        
        
    })

})


app.get("/getAll", (req,res)=>{
	res.send([
		{ id: 1, name: "nithi", age: 26,salary:20000,email:"nithin@cronj.com" },
		{ id: 2, name: "adith", age: 23,salary:25000,email:"adit@cronj.com" },
	]);
});



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
  