const express = require ('express');
const app = express();

// app.use((req,res,next)=>{
//     console.log('first');
//     next();
// });

// app.use((req,res,next)=>{
//     console.log('second')
//     res.send('<h1>Assignment</h1>')
// })

app.use('/users',(req,res,next)=>{
    console.log('first');
    res.send('<h1>Assignment from users</h1>')
});

app.use('/',(req,res,next)=>{
    console.log('second')
    res.send('<h1>Assignment</h1>')
})

app.listen(4000);