  const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const session =require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');

// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

const app = express();
const store = new MongoDBStore({
  uri: 'mongodb+srv://ubisage:Cisco%40123@cluster0.zdqwfx2.mongodb.net/shop?retryWrites=true&w=majority',
  collection: 'sessions',
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
 
// const { Sequelize } = require('sequelize');

//testing that it connected to our products table

// db.execute('SELECT * FROM products')
//   .then(result => {
//     console.log(result[0], result[1]);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret',resave: false, saveUninitialized:false,store:store}))
// Need here is because without below code its  getting data only but not the oject which contains all the methods, so cant use these methods now u will changes controllers not to use req.session but use req.user, now req.user is moongose object with all methods
app.use((req,res,next)=>{
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then(user=>{
    req.user=user
    next();
  }).catch(err=> console.log(err));
})

// used by mongoose
/* The commented code block is a middleware function that is used to fetch a user from the database and
attach it to the request object (`req.user`). */


// used by mongo 
// app.use((req,res,next)=>{
//   User.findById("653d0a782a33f9ac4f1d994a")
//   .then(user=>{
//     req.user=new User(user.name, user.email, user.cart , user._id);
//     next();
//   }).catch(err=> console.log(err));
// })

  // on user we cant access User models methods that is why above
// app.use((req,res,next)=>{
//   User.findById("653d0a782a33f9ac4f1d994a")
//   .then(user=>{
//     req.user=user;
//     next();
//   }).catch(err=> console.log(err));
  // Sequelize
  // User.findByPk(1)
  // .then(user=>{
  //   req.user=user;
  //   next();
  // }).catch(err=> console.log(err))
  // next();
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.get404);

// mongo connect requires a callback function which will get client 
// mongoConnect(() =>{
//   app.listen(4000);
//   console.log('APP runing on localhost:4000')
// })

mongoose.connect('mongodb+srv://ubisage:Cisco%40123@cluster0.zdqwfx2.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
  User.findOne().then(user=>{
    if (!user){
      const user = new User({
        name:'Ubi',
        email:'test@gmail.com',
        cart:{
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(4000);
  console.log('App running on localhost: 4000')
})
.catch(err => {console.log('App index level',err)});

