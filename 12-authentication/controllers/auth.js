const User = require('../models/user')
exports.getLogin = (req, res, next) => {
console.log(req.session.isLoggedIn)
    // console.log(req.get('Cookie').split(";")add moe things to find the cookie uc created) //cookie
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated:req.session.isLoggedIn
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("655759e398630e897417df25")
  .then(user=>{
    req.session.isLoggedIn = true;
    req.session.user=user;
    req.session.save((err)=>{
      console.log(err)
      res.redirect('/');
    });
  }).catch(err=> console.log(err));
    // res.setHeader("Set-Cookie", "loggedIn=true") cookie
  };

  exports.postSignup = (req, res, next) => {};
  
exports.postLogout = (req, res, next) => {
  
    req.session.destroy(err=>{
      console.log(err);
      res.redirect('/');
    });
  
    // res.setHeader("Set-Cookie", "loggedIn=true") cookie
  };