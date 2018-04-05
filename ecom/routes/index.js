var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var catmodel = require('../model/categorymodel');
var productmodel = require('../model/productmodel');
var usermodel = require('../model/usermodel');
var async = require('async');
// console.log(catmodel);

/* GET home page. */

var router = express();

router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!", cookie: { expires: new Date(Date.now() + (30 * 86400 * 1000) )}}));
var userloginmodel = require('../model/userloginmodel');
console.log('login of data='+userloginmodel);
// res.cookie('cookie', 'monster');
// req.cookies['cookie']
// console.log("ssss",req.session);

router.get('/userlogout', function(req, res, next){
  console.log('Inisde Logout');
  req.session.destroy(function(err) {
    if(err) {
      console.log('Inside err:'+err);
    } else {
      console.log('Inside destroy:'+req.session);
      res.redirect('/');
    }
  });
});

// user login area
router.get('/userlogin', function(req, res, next){
  var msg = "";
  res.render('userlogin', {msg:msg});
});

router.post('/userlogindata', function(req, res, next) {
  // console.log('inside post of login', req.body);
  var post = req.body;
  var username;
  var msg;
      console.log('user login');
      if (post.emailid && post.pass) {
        userloginmodel.userLogin(post, function(err, data) {
     // console.log('here '+data);
        if (data === false || data === null || data =='') {
            var msg = "Wrong Credintials";
            res.render('userlogin', {msg:msg});
        } 
        else {
            console.log('login is successful');
           req.session.username = data[0].username;
           req.session.emailid = data[0].emailid;
           console.log('here '+data[0].emailid);
           req.session.userid = data[0].userid; 
           console.log(req.session);
           // console.log('1244445',req.session.cookie.username);
           res.redirect('/');
        }
      });
      }
      else{
        req.session.emailid = post['U3'];
        req.session.username = post['ofa'];
        req.session.userid = post['Eea'];
        req.session.image = post['Paa'];
        // req.session.tokenid = post['id_token'];
        // console.log("id_token", req.sesssion.tokenid);
        // console.log('reqsesssion',req.session);
        var resp = {
          status: 0,
          status_msg: 'success'
        }
        res.send(resp);
      }
     
  });

router.get('/register', function(req, res, next){
  
    res.render('register');
});

router.get('/userlogin/forgetpass', function(req, res, next){
  var data = "";
  res.render('forgetpass', {data:data});
});

router.post('/userlogin/forgetpass', function(req, res, next){
  var post = JSON.parse(req.body.formdata)[0];
  console.log("sss",post);
  userloginmodel.forgetPass(post, function(error, data){
    console.log(data);
    if (data == false || data == null || data == '') {
      var message = {
        status: 1,
        status_msg: "Message Failed"
      }
      res.send(message);
    }
    else{
      // res.render('forgetpass', {data:data});
      var message = {
        id: data[0].userid,
        status: 0,
        status_msg: "Message Success"
      }
     res.send(message);
    }
  });
});


router.post('/userlogin/forgetpass/done', function(req, res, next){
  console.log("done data",req.body);
  var inputfield = {
    fid : req.body.fid,
    pass2 : req.body.pass2
  }
  userloginmodel.updatePassword(inputfield, function(error, result){
    if (error) {
      var msg ="Wrong Password"
      res.redirect('/userlogin/forgetpass?error='+msg);
    }
    else{
      res.redirect('/');
    }
  });

});
// user registration data post

router.post('/registrationdata', function(req, res, next){
  var inputfielddata4 ={
    uname :req.body.uname,
    mob :req.body.mob,
    email :req.body.email,
    status :req.body.status,
    pass :req.body.pass,
    sts : 'sts'
  };
  console.log(inputfielddata4);
  console.log('any thing'); 
  usermodel.addUsers(inputfielddata4, function(error, result){
    if (error) {
      var msg = 'wrong input';
      res.redirect('/register?error'+msg);
    }
    else{
      res.redirect('/');
    }
  });
});

router.get('/', function(req, res, next){
    catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('index', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('index', {error:error});
              }
              else{
                res.render('index', {data:listcat, listProduct:result, userdata:req.session});
              }

            });
        }
        
    });
});
router.get('/myaccount', function(req, res) {

catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('myaccount', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('myaccount', {error:error});
              }
              else{
                res.render('myaccount', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

            

        }
        
    });
});

  //res.render('myaccount');

router.get('/carousal', function(req, res, next){
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('carousal', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('carousal', {error:error});
              }
              else{
                res.render('carousal', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

            
        }
        
    });
});
// res.render('carousal');

/*router.get('/', function(req, res, next){
    catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('index', {error:error});
        }
        else{
            res.render('index', {data:result});
            console.log('result ka data'+result);

        }
        
    });
});*/
// router.get('/product', function(req, res) {
//   catmodel.listCategory('', function(error, result){
//         if (error) {
//             res.render('product', {error:error});
//         }
//         else{
//             var listcat = result;
//             productmodel.searchProduct('','','', function(error, result){
//               if (error) {
//                 res.render('product', {error:error});
//               }
//               else{
//                 res.render('product', {data:listcat, listProduct:result, userdata:req.session});
//               }

//             });
//         }
        
//     });
// });
  router.get('/product', function(req, res) {
console.log('ramehs', req.query);
  var page = req.query.page;
  if(req.query.page == undefined){
    page = 1;
  }
  
  async.parallel([
    async.apply(catmodel.listCategory, ''),
    async.apply(productmodel.listProductCount),
    async.apply(productmodel.pagiNation, page)
    ], function(error, result){
      console.log('rmaesh01',error,result);
      if (error) {
        res.render('product', {error:[]});
      }
      else{
        res.render('product', {data:result[0], listProduct:result[2],cnt: result[1], userdata:req.session, page:page});
      }
      console.log('list01', result[1], 'page014', page);
  });
});
  //res.render('product');
router.get('/productdetail', function(req, res) {
  console.log("id  of ", req.query.img2);
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('productdetail', {error:error});
        }
        else{

            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('productdetail', {error:error});
              }
              else{

                 res.cookie('image', result[0].img2); 
                 res.cookie('title', result[0].title); 
                 res.cookie('price', result[0].price); 
                 res.render('productdetail', {data:listcat, listProduct:result, userdata:req.session});
                 // res.write(req.cookies.image);
                 // res.send(body|status[headers|status[status]])
              }
               console.log("889",result); 
                  console.log('Cookies: ', req.cookies);

            });
        }
        
    });
});


// router.get('/addtoCart', function(req, res){
//    res.cookie('title', 'Deepak Chauhan').send('cookie set'); //Sets name = express
//    console.log('Cookies: ', req.cookies);
// });

router.get('/checkout_cart', function(req, res) {
catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('checkout_cart', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('checkout_cart', {error:error});
              }
              else{
                res.render('checkout_cart', {data:listcat, listProduct:result, userdata:req.session});
              }

            });
        }
        
    });
});

  //res.render('checkout_cart');

router.get('/checkout_info', function(req, res) {
catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('checkout_info', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('checkout_info', {error:error});
              }
              else{
                res.render('checkout_info', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

           
        }
        
    });
});

//  res.render('checkout_info');

router.get('/checkout_payment', function(req, res) {
catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('checkout_payment', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('checkout_payment', {error:error});
              }
              else{
                res.render('checkout_payment', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

           

        }
        
    });
});

  //res.render('checkout_payment');

router.get('/checkout_complete', function(req, res) {
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('checkout_complete', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('checkout_complete', {error:error});
              }
              else{
                res.render('checkout_complete', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

           

        }
        
    });
});
  //res.render('checkout_complete');

router.get('/search_results', function(req, res) {
  console.log('fn122', req.query);
  var search = req.query.search;
  var pricefrom = req.query.pricefrom;
  var priceto = req.query.priceto;
catmodel.listCategory('', function(error, result){
  console.log("error01",error, result);
        if (error) {
            res.render('index', {error:[]});
        }
        else{
            var listcat = result;
            productmodel.searchProduct(search,pricefrom, priceto, function(error, result){
              if (error) {
                res.render('search_results', {error:error});
              }
              else{
                res.render('search_results', {data:listcat, listProduct:result, userdata:req.session});
                console.log(result);
              }

            });
        }
        
    });
});


  //res.render('search_results');

router.get('/index_fixed_header', function(req, res) {
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('index_fixed_header', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('index_fixed_header', {error:error});
              }
              else{
                res.render('index_fixed_header', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

        }
        
    });
});
  //res.render('index_fixed_header');

router.get('/index_inverse_header', function(req, res) {
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('index_inverse_header', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('index_inverse_header', {error:error});
              }
              else{
                res.render('index_inverse_header', {data:listcat, listProduct:result, userdata:req.session});
                console.log(result);
              }

            });

            

        }
        
    });
});
//  res.render('index_inverse_header');

router.get('/faq', function(req, res) {
catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('faq', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('faq', {error:error});
              }
              else{
                res.render('faq', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

            

        }
        
    });
});

//  res.render('faq');

router.get('/about_us', function(req, res) {
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('about_us', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('about_us', {error:error});
              }
              else{
                res.render('about_us', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

            
        }
        
    });
});
//  res.render('about_us');

router.get('/contact_us', function(req, res) {
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('contact_us', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('contact_us', {error:error});
              }
              else{
                res.render('contact_us', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

           

        }
        
    });
});
//  res.render('contact_us');

router.get('/zoom', function(req, res) {
  catmodel.listCategory('', function(error, result){
        if (error) {
            res.render('zoom', {error:error});
        }
        else{
            var listcat = result;
            productmodel.searchProduct('','','', function(error, result){
              if (error) {
                res.render('zoom', {error:error});
              }
              else{
                res.render('zoom', {data:listcat, listProduct:result, userdata:req.session});
              }

            });

            //res.render('index', {data:result});
           //  console.log('result ka data'+result);

        }
        
    });
});
  //res.render('zoom');

module.exports = router;
