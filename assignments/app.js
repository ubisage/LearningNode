const http = require('http')

const server = http.createServer((req,res)=>{
    const url = req.url;
    if(url === '/'){
        res.setHeader('Content-type','text/html');
        res.write('<html>')
        res.write('<head><title>Greetings</title></head>')
        res.write('<body><h1>Hello welcome from server</h1><form method="POST" action="/create-user"><input type="text" name="username">Username</input><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        res.end();
    }

    if(url === '/users'){
        res.setHeader('Content-type','text/html');
        res.write('<html>')
        res.write('<head><title>Dummy users</title></head>')
        res.write('<body><h1>List from server</h1> <ul><li>One</li><li>Two</li><li>Three</li></ul></body>')
        res.write('</html>')
        res.end();
    }

    if(url === '/create-user' && req.method === 'POST'){
       const body=[];
       req.on('data',(chunk)=>{
        body.push(chunk)
       })
       req.on('end',()=>{
        const parsedBody= Buffer.concat(body).toString();
        console.log(parsedBody.split("=")[1]);
    })
    res.statusCode = 302;
    res.setHeader('Location', '/users');
    return res.end()
    }

 
})
server.listen(8000)

