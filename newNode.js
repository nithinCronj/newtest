var http = require('http');
const url = require('url');
const redis = require("redis");
const { appendFile } = require('fs');
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

employeeDetails = 
{"1":{"name":"Nithin", "age":25, "email":"nithin@cronj.com"},
"2":{"name":"aditya", "age":25, "email" :"aditya@cronj.com"}}

admin = 
{
    user: "nithi",
    pass: "123"
}

function getroute(url)
{
   const r= url.split("/")[1].split("?")[0];
   console.log(r);
   return r   
}

function getQuery(request)
{
    var url_parts = url.parse(request.url, true);
    request.query = url_parts.query;
}

callBackFunction = (req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'}); 
    getQuery(req);
    switch(req.method){
        case "POST":
                switch(getroute(req.url)){
                    case "add":
                        {
                        var reqEmp="";
                        req.on('data',(data)=>{
                            reqEmp+=data;
                                            })
                        req.on('end', () =>
                            {
                            let reqData= JSON.parse(reqEmp.toString());
                            //console.log(reqData);
                            client.set(JSON.stringify(reqData.email), JSON.stringify(reqData) ,(err, data)=>{
                            if(err){
                                    console.log(data)
                                    res.end("error")     
                                    }
                                else{
                                    res.end(JSON.stringify(reqData))
                                    }
                                                                                                })
                            
                                    })
                        break;
                    }
                    case "login":{
                       // res.setHeader('Content-Type', 'application/json');

                        var requestData = ""
                        req.on('data', (data)=>{
                            requestData+=data;
                                                })
                        req.on('end', ()=>{
                            let parsedReq = JSON.parse(requestData.toString()); 
                            //console.log("parse req",parsedReq)
                            if( parsedReq.user == admin.user && parsedReq.pass == admin.pass){  
                               // res.end(JSON.stringify({success:true})) //serializers
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.write(JSON.stringify({success:true}));
                                    res.end();
                            }
                            else{
                                res.end(JSON.stringify({success:false}))
                            }
                        })
                        break;
                    }
                    default : {
                        res.end("Error")
                        break
                    }
                }
            break;

        case "GET":
            switch(getroute(req.url)){
                case "employee":{
                    const {id} = req.query;
                    console.log(id);
                    const r=employeeDetails[id]
                    console.log(r);
                    res.end(JSON.stringify(r))
                    break;
                }
                default : {
                    console.log("default")
                    res.end("Error")
                    break
                }
            }   
      
    }
}



http.createServer(callBackFunction).listen(8080);