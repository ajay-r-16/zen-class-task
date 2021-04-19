const express = require('express');
const fs = require('fs');



const app = express();
app.use('/images', express.static('images')); 

app.get("/",(req,res)=>{
   
    fs.readdir('./directory',(err,files)=>{
        
        var response = "";
        files.map((a)=>{
            let b = a.split(".");
            if(b[1]==undefined){
                response += "<img src='./images/folder.png' height='20px' width='20px'>"
                response += "<span>  "+a+"</span><br><br>";
            }
            else{
                response += "<img src='./images/files.png' height='20px' width='20px'>"
                response += "<span>  "+a+"</span><br><br>";
                
            }
        });
        
        res.send(response);
    });


    
})






app.listen(process.env.PORT || 3000,() => console.log("Example app listening on port 3000!"));

// http://localhost:3000