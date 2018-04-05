var express = require('express');
var catmodel = require('../../model/categorymodel');

var router = express.Router();

router.get('/', function(req, res, next){
    catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('admin/category', {error:error});
        }
        else{
            res.render('admin/category', {data:result, adminname: req.session.adminname });
        }
        
    });
});


router.post('/addcatdata', function(req, res, next){
    console.log('req.body:', req.body);
    var formdata = JSON.parse(req.body.formdata)[0];
    console.log('formdata:'+formdata, formdata.cname);
    var formfielddata={
        catname: formdata.catname,
        parentid: formdata.parentid,
        sts : '0'
    }
    console.log("add cat data  "+JSON.stringify(formfielddata));
    catmodel.addCat(formfielddata, function(error, result){
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

router.get('/updatecate', function(req, res, next){
    var catid=req.query.categoryid;
    console.log(catid);
    catmodel.getCategoryById(catid, function(error, result){
        if (error) {
            res.render('/admin/updatecat', {error:error});
        }
        else{
            res.render('/admin/updatecat', {data:result, adminname: req.session.adminname });
        }
});
});

    
// router.post('/updatecatdata', function(req, res, next){
//     console.log('req.body 123', req.body);
//     // var formdata = JSON.parse(req.body.formdata)[0];
//     // console.log('formdata:',formdata);

//     var inputfielddata2 = {
//         cid : req.body.cid,
//         cname :req.body.cname,
//         pid : req.body.pid
//     }
//     console.log('input data'+inputfielddata2);
//     catmodel.updateCategory(inputfielddata2, function(error, result){
//         console.log('updateCategory k data', error, result);
//        if (error) {
//             var resp = {
//                 status : '1',
//                 status_msg: 'fail'
//             }
//             var response = JSON.parse(JSON.stringify(resp));
//             res.send(response);
//         }
//         else{
//             var resp = {
//                 status : '0',
//                 status_msg: 'Success'
//                 // catid:result.insertId
//             }
//             var response = JSON.parse(JSON.stringify(resp));
//             res.send(response);
//         }
//     });

// });
//         }
//     });

// });

router.post('/updatecatdata', function(req, res, next){
    var inputfielddata2 = {
        cid : req.body.cid,
        cname :req.body.cname,
        pid : req.body.pid,
    }
    catmodel.updateCategory(inputfielddata2, function(error, result){
        if (error) {
            var msg = 'wrong input';
            res.redirect('/admin/category?categoryid'+req.body.cid);
        }
        else {
            res.redirect('/admin/category');
        }
    });

});

router.post('/delete', function(req, res, next) {
console.log('id of delete', req.body);

var cid  = req.body.cid;
  catmodel.deleteCategory(cid, function(err, result){
   if (!err && result && result.affectedRows > 0) {
        var resp = {
            status: "0",
            status_msg: "Success"
        };
        var response = JSON.parse(JSON.stringify(resp));
        res.send(response);
        console.log('respnse of '+response);
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

router.post('/getsubcategorybycategory', function(req, res, next) {
    console.log('Inside ajax');
    var categoryid = req.body.categoryid; 
    catmodel.listCategory(categoryid, function(error, result){
        if (error) {   
        console.log('inside error');
            res.send({error:error});
        }
        else{
            res.setHeader('content-type', 'text/json');
            res.send(result);
            // console.log(catmodel);
        }   
    });
});



module.exports = router;
