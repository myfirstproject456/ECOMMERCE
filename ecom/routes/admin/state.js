var express = require('express');
var router = express.Router();

var statemodel = require('../../model/statemodel');

//state related work

router.get('/add', function(req, res, next){
    res.render('add');
});

router.get('/', function(req, res, next){
   statemodel.listState(function(error, result){
    console.log('state ka data',error, result)
    if (error) {
        res.render('admin/state', {error:error});
    }
    else
    {
        res.render('admin/state', {data:result, adminname: req.session.adminname });
    }
    
   });
});

router.post('/adddata', function(req, res, next){
    console.log('req.body', req.body);
    var post = JSON.parse(req.body.formdata)[0];
    var formfielddata=
    {
        statename:post.statename,
        sts : '0'
    }
    console.log(formfielddata);
    statemodel.addState(formfielddata, function(error, result){
        // console.log('state ka data', error, result)

        if (error) {
            var resp = {
                status : '1',
                status_msg : "fail"
            }
            var response = JSON.parse(JSON.stringify(resp));
            res.send(response);
        }
        else
        {
            var resp = {
                status : '0',
                status_msg : "Success"
            }
            var response = JSON.parse(JSON.stringify(resp));
            res.send(response);
        }
    });

});

// router.get('/update', function(req, res, next){
//      var sid=req.query.stateid;
//     statemodel.getStateById(sid, function(error, result){
//         if (error) {
//             res.render('/admin/state', {error:error});
//         }
//         else{
//             res.render('/admin/state', {data:result});
//         }
//     });
//    // res.render('update');
    
// });

router.post('/updatedata', function(req, res, next){
    var inputfielddata2 = {
        sid : req.body.sid,
        sname : req.body.sname
    }
        // console.log(inputfielddata2);
    statemodel.updateState(inputfielddata2, function(error, result){
        console.log('ys updated');
        if (error) {
            var msg = "wrong input";
            res.redirect('/admin/state');
            // console.log("data of update");
        }
        else{
            res.redirect('/admin/state');
        }
    });
});

router.post('/delete', function(req, res, next) {
var stateid  = req.body.stateid;
console.log('id of delete'+stateid);
  statemodel.deleteState(stateid, function(err, result){
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