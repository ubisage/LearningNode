  const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
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

app.use((req,res,next)=>{
  User.findByPk(1)
  .then(user=>{
    req.user=user;
    next();
  }).catch(err=> console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'}); //will add foreign key to product referncing user id
User.hasMany(Product);

User.hasOne(Cart); //will add key field basically column to the cart (userId)
Cart.belongsTo(User); //will add key field basically column to the cart
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
 
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem})


sequelize.sync().then(result=>{ //syncs models defined usind Sequelize.define method into database table and relations
// sequelize.sync({force:true}).then(result=>{ //syncs models defined usind Sequelize.define method into database table and relations and overwrite old changes with new one
  // console.log(result);
  return User.findByPk(1);
})
.then(user=>{
  if(!user){
    return User.create({name:'Ubi',email:'test@gmail.com'});
  }
  return user;
})
.then(user=>{
// console.log(user);
return user.createCart();
})
.then(cart=>{
  app.listen(4000);
  console.log('Server running on 4000')
})
.catch(err=>console.log(err))

