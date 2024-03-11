const http = require('http')

const express= require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('in mddleware')
    next();  //alows the req to continue to next middleware in line
})

app.use((req,res,next)=>{
    console.log('in another middleware')
    // res.setHeader('Content-Type','text/html') :To change the default Content-Type header
    res.send('<h1>HI inside html</h1>') //Provides some default functions like res.write() res.end() res.setHeader()
})

// const server = http.createServer(app);
// server.listen(8000)
// Instead use 
app.listen(8000)