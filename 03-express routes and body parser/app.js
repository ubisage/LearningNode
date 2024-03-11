const express = require('express');
const bodyParser = require('body-parser')

const app = express ();

const adminRoutes= require('./routes/admin');
const shopRoutes= require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

// order matters but we can switch the order here itself because we use get inside shop.js which does exact matching
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(4000);