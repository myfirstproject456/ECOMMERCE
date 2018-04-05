var express = require('express');
var async = require('async');
var fs = require("fs");
var multer = require('multer');
var pool = require('../../util/dbconnection');

//console.log('this is mv'+mv)
var categorymodel = require('../../model/categorymodel');
var productmodel = require('../../model/productmodel');

var router = express.Router();

var listCategory = '';


router.get('/', function (req, res, next){ 
    console.log("produccc", req.body);
    function listProduct(cb){
        async.parallel([
            async.apply(productmodel.searchProduct,'','',''),
            async.apply(categorymodel.listCategory,'')
            ],function(error,result){
                console.log('main ka data',error,result);
                if (error) {
                    cb(error, null);
                }
                else{
                    cb(error, result);
                }
        });
    }

    listProduct(function (error, result){
        if (error) {
            res.render('admin/product', {error:error});
        }
        else{
            res.render('admin/product', {data:result[0], listCategory:result[1], adminname: req.session.adminname });
            console.log('resultka data'+JSON.stringify(result));
        }
});
   

    //res.render('product');
});

// router.get('/addproduct', function(req, res, next){
//     categorymodel.listCategory('', function(error, result){
//         if (error) {
//             res.render('addproduct', {error:error});
//         }
//         else{

//             res.render('addproduct', {data:result});
//         }
//     });
// });

router.post('/addproductdata', function(req, res, next){
    console.log('body k data', req.body);
    
    var files = [];

    // var coid = req.session.user.coid;
    
    
    
    var filewithdir, doc_name = '',
        doc_desp = '';
    var post;

        var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            console.log('req123',file);
            callback(null, "./public/assets1/Contents");
        },
        filename: function(req, file, callback) {
            filename = file.originalname;
            console.log("file name of " + filename);
            var i = filename.lastIndexOf('.');
            extesion = (i < 0) ? '' : filename.substr(i);
           
            console.log("extesion ofimage "+ extesion);
            // var fileExtension = require('file-extension');

            filewithdir = '/Contents/' + filename;
            console.log("set "+ filewithdir);
            files.push(filewithdir);

            console.log("FileArray", files);
            console.log("Filename", filename);
            callback(null, filename);
        }
    });

    var upload = multer({
        storage: Storage
    }).array("imgUploader", 10); //Field name and max count 
    upload(req, res, function(err) {
        console.log("COntext error", err);
        console.log("COntext body", req.body);

        if (err) {
            return res.end("Something went wrong!");
        }
       
        
        savedata();
    });

    function savedata() {
        // var txnrefno = new Date().getTime();
        var post = req.body;

            tit= post.tit,
            tags= post.tags,
            dis=post.dis,
            c1name= post.c1name,
            scat= post.scat,
            price= post.price,
            status= post.status,
            sts = '0'
        for (var i = files.length; i < 10; i++) {
            files.push("");
        }

        var query = "INSERT INTO `products` (title, tagskeys, discription, categoryid, sub_categoryid, status, price,sts,img,img2, imgurl3, imgurl4, imgurl5, imgurl6, imgurl7, imgurl8, imgurl9, imgurl10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        var params = [tit,tags,dis,c1name,scat,status,price,sts];

        for (var i = 0; i < files.length; i++) {
            params.push(files[i]);
        }

         pool.query(query ,params,function(err, results){   
             console.log(" product ka result", err, results);
            if (!err && results && results.affectedRows > 0) {

              var resp = {
                status:"0",
                status_msg:"Success"
              };
              var response = JSON.parse(JSON.stringify(resp));
              res.send(response);
              // callback(err,response);
            }else{
             var err_msg="Failed to create task schedules";
             if(err){err_msg = err["sqlMessage"] }
              var resp = {
                status: "1",
                status_msg: err_msg
              };
              var response = JSON.parse(JSON.stringify(resp));
              res.send(response);
              console.log('response hai'+response);
               // callback(err,response);
             }                 
           });
        // callback(null,customerdata);
    }
    // console.log(formfielddata);
    // productmodel.addProduct(formfielddata, function(error, result){
    //     if (error) {
    //         var msg = 'wrong input';
    //         res.redirect('/admin/product/addproduct?error'+msg);
    //     }
    //     else{


    //         console.log('Last Insert Id'+result.insertId);
            
    //         //res.redirect('/admin/ads');
    //         var imagedata1 = {
    //             pid: result.insertId,
    //             img:sampleFile.name,
    //             ext : ext,
    //         }
    //         console.log('imagedata1',imagedata1);
    //         productmodel.addImage(imagedata1,function(error, result){
    //             console.log('Insert kd',error, result)
    //             if (error) {
    //                 res.redirect('/admin/product/addproduct');
    //             }
    //             else{
    //                 var destPath= __dirname+'/../../public/assets/images/'+result.insertId+'.'+ext;

    //                 mv(path, destPath, function(error){
    //                 if (error) {
    //                     res.status(500).send(error);
    //                 }
    //                 else{
                        
    //             //res.redirect('/admin/product');
    //                 }
    //             });
    //         }
    //     });

    //         var imagedata2 = {
    //             pid: result.insertId,
    //             img:sampleFile1.name,
    //             ext : ext1,
    //         }
    //         productmodel.addImage(imagedata2,function(error, result){
    //             if (error) {
    //                 res.redirect('/admin/product/addproduct');
    //             }
    //             else{
    //                 var destPath= __dirname+'/../../public/assets/images/'+result.insertId+'.'+ext;
    //                // var destPath= __dirname+'/../public/assets/'+result.insertId+'.'+ext1;

    //                 mv(path1, destPath, function(error){
    //                 if (error) {
    //                     res.status(500).send(error);
    //                 }
    //                 else{
    //                     res.redirect('/admin/product');
    //                 }
    //             });
    //         }

    //     });
         
    //     //res.redirect('/admin/product');
        
    //     }

    // });
    
});

router.get('/updateproduct', function(req, res, next){
    var id = req.query.productid;
    console.log('id id here'+id);
    productmodel.getProductById(id, function(error, result){
        if (error) {
            console.log('error side')
            res.render('/admin/product', {error:error});
        }
        else{
            console.log('result side');
            res.render('/admin/product', {data:result, adminname: req.session.adminname });
            console.log('result id here='+result);
        }
    });
});


router.post('/updateadsdata', function(req, res, next){
    var formfielddata2={
            pid: req.body.pid,
            tit: req.body.tit,
            tags: req.body.tags,
            dis:req.body.dis,
            c1name: req.body.c1id,
            scat: req.body.scid,
            price: req.body.price,
            status: req.body.status
    }
    console.log("hello update"+formfielddata2, formfielddata2.dis);
    productmodel.updateProduct(formfielddata2, function(error, result){
        if (error) {
            var msg='wrong input';
            res.redirect('/admin/product?error'+msg);
        }
        else{
            res.redirect('/admin/product');
        }
    });
});


router.post('/delete', function(req, res, next) {
console.log('id of delete', req.body);
  var productid= req.body.productid;
  productmodel.deleteProduct(productid, function(err, result){
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
router.get('/changestatus', function(req, res, next){
    var id = req.query.pid;
    console.log('action body='+id);
    var action = req.query.action;
    console.log("here is action"+action);
    var status ='';
    if (action == 'reject') {
        status = 'rejected';
    } else if(action == 'approve') {
        status = 'approved';
    }

    var inputData = {
        pid:id,
        status:status
    }
    productmodel.changeStatus(inputData, function(error, result){
        res.redirect('/admin/product');
    });
});




module.exports = router;
