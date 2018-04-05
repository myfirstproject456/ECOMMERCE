var express = require('express');
var usermodel = require('../../model/usermodel');
var async = require('async');

var router = express.Router();

router.get('/', function(req, res, next){
    function listUser(cb){
        async.parallel([
            async.apply(usermodel.listUser),
            ],function(error,result){
                if (error) {
                    throw error;
                }
                else{
                    return cb(error, result);
                }
        });
    }
         listUser(function(error,result){
        if (error) {
             res.render('admin/users', {error:error});
        }
        else{
            res.render('admin/users', {data:result[0], adminname: req.session.adminname });
            console.log('resultka data'+JSON.stringify(result));
        }
    });
    });

router.post('/addusersdata', function(req, res, next){
    console.log('req.body:', req.body);
    var formdata = JSON.parse(req.body.formdata)[0];
    console.log('formdata:'+formdata, formdata.cname);
    
    var formfieddata={
        uname: formdata.uname,
        mob: formdata.mob,
        email: formdata.email,
        status: formdata.status,
        sts: '0'
    }
    console.log(formfieddata);
    usermodel.addUsers(formfieddata, function(error, result){
        if (error) {
            var resp = {
                status : '1',
                status_msg: 'fail'
            }
            var response = JSON.parse(JSON.stringify(resp));
            res.send(response);
        }
        else{
            var resp = {
                status : '0',
                status_msg: 'Success'
            }
            var response = JSON.parse(JSON.stringify(resp));
            res.send(response);
        }
    });
});

router.get('/updateusers', function(req, res, next){
    var id=req.query.userid;
    console.log(id);
    usermodel.getUserByid(id, function(error, result){
        if (error) {
            res.render('updateuse', {error:error});
        }
        else{
            res.render('updateuse', {data:result, adminname: req.session.adminname });
            console.log(result);
        }
    });
});

router.post('/updateuserdata', function(req, res, next){
    var formfieddata2 = {
        uid:req.body.uid,
        uname:req.body.uname,
        mob:req.body.mob,
        email:req.body.email,
        status:req.body.status
        
    }
    console.log(formfieddata2);
    usermodel.updateUser(formfieddata2, function(error, result){
    if (error) {
        var msg='wrong input';
        res.redirect('/admin/users?error'+msg);
    }
    else{
        res.redirect('/admin/users');
    }
});

});

router.post('/delete', function(req, res, next) {
var userid  = req.body.userid;
console.log('id of delete'+userid);
  usermodel.deleteUser(userid, function(err, result){
   if (!err && result && result.affectedRows > 0) {
        var resp = {
            status: "0",
            status_msg: "Success"
        };
        var response = JSON.parse(JSON.stringify(resp));
        res.send(response);
        console.log(response);
    } else {
      var err_msg="Failed to delete task";
      if(err){err_msg = err["sqlMessage"] }
        var resp = {
            status: "1",
            status_msg: err_msg
        };
        var response = JSON.parse(JSON.stringify(resp));
        res.send(response);
    } 
});
});
module.exports = router;
