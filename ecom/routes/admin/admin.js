var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var dashboard = require('././dashboard');
var state = require('././state');
var city = require('././city');
var category = require('././category');
var locality = require('././locality');
var users = require('././users');
var product = require('././product');
var drp = require('././drp');

 

var adminapp = express();

adminapp.use(cookieParser());
adminapp.use(session({secret: "Shh, its a secret!", cookie: { expires: new Date(Date.now() + (30 * 86400 * 1000) )}}));
var adminmodel = require('../../model/adminmodel');
console.log(adminmodel);



adminapp.post('/login', function(req, res, next){
    var username;
    var msg;    
    adminmodel.adminLogin(req.body, function(error, data){
    
    if (data === false || data === null || data =='') {

        var message = "Wrong Credentials.";
        res.render('admin/adminlogin', {message:message});
        console.log('error02', message);
    }
    else{

        req.session.adminname = data[0].adminname;
        req.session.adminid = data[0].adminid;
        res.redirect('/admin/dashboard');
    }
});
});

adminapp.use(function(req, res, next){
    //console.log('here is path'+req.path);
    //console.log('here is user='+req.session.adminuser);
    
    if (req.session.adminid || req.path ==='/') {
        next();
    }
    else{
        res.redirect('/admin');
    }
});

adminapp.get('/logout', function(req, res, next){
    req.session.destroy(function(error, result){
        if (error) {
            res.redirect('/dashboard');
        }
        else{
            res.redirect('/admin');
        }
    });
});

adminapp.use('/dashboard', dashboard);
adminapp.use('/state', state);
adminapp.use('/city', city);
adminapp.use('/category', category);
adminapp.use('/locality', locality);
adminapp.use('/users', users);
adminapp.use('/product', product);
adminapp.use('/drp',drp);
adminapp.use('/', function(req, res, next){
    var message = "";
    res.render('admin/adminlogin', {message:message});
});

module.exports = adminapp;
