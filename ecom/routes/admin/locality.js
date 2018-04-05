var express = require('express');
var citymodel = require('../../model/citymodel');
var localitymodel = require('../../model/localitymodel');
var async = require('async');


var router = express.Router();

router.get('/', function(req, res, next){

    function listLocality(cb){
        async.parallel([
            async.apply(localitymodel.listLocality),
            async.apply(citymodel.listCity),
            ], function(error,result){
                if (error) {
                    throw error;
                }
                else{
                    return cb(error, result);
                }
            });
    }

    listLocality(function (error,result){
        if (error) {
            res.render('admin/locality', {error:error});
        }
        else{
            res.render('admin/locality', {data:result[0], listCity:result[1], adminname: req.session.adminname });
            console.log('result ka data'+JSON.stringify(result[0]));
        }
    });
    });

//     localitymodel.listLocality(function(error, result){
//             console.log("routi"+result);

//         if (error) {
//             res.render('admin/locality', {error:error});
//         }
//         else{
//              citymodel.listCity(function(error, result){
//                 if (error) {
//                     res.render('/admin/addloc');
//                 }
//                 else{
//                     res.render('/admin/addloc');
//                 }
//              });
//             res.render('admin/locality', {data:result});
//         }
//     });
// });

// router.get('/addloc', function(req, res, next){ 
//     citymodel.listCity(function(error, result){
//         if (error) {
//             res.render('/admin/addloc', {error:error});
//         }
//         else{
//             res.render('/admin/addloc', {data:result});
//         }
//     });
// });

router.post('/addlocdata', function(req, res, next){
    console.log('req.body:', req.body);    
    var formdata = JSON.parse(req.body.formdata)[0];
    console.log('formdata:'+formdata, formdata.locname);
    var formfielddata ={
        cityid: formdata.cityname,
        locname: formdata.locname,
        sts : "0"
    }
    console.log("add data"+ formfielddata, JSON.stringify(formfielddata));
    localitymodel.addLocality(formfielddata, function(error, result){
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


router.get('/updateloc', function(req, res, next){
    var id = req.query.localityid;
    localitymodel.getLocalityById(id, function(error, result){
        console.log("result error", error, result);

        if (error) {
            res.render('updateloc', {error:error});
        }
        else{
            res.render('updateloc', {data:result, adminname: req.session.adminname });
        }
    });
});


router.post('/updatelocdata', function(req, res, next){
    var formfielddata2={
        locid:req.body.lid,
        cityid:req.body.cid,
        lname:req.body.lname,
    }
    console.log(formfielddata2);
    localitymodel.updateLocality(formfielddata2, function(error, result){
        if (error) {
            var msg='wrong input';
            res.redirect('/admin/locality?error'+msg);
        }
        else{
            res.redirect('/admin/locality');
        }
    });
});


router.post('/delete', function(req, res, next) {
console.log('id of delete', req.body);
  var localityid= req.body.localityid;
  localitymodel.deleteLocality(localityid, function(err, result){
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
