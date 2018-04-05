var express = require('express');
var citymodel = require('../../model/citymodel');
var statemodel = require('../../model/statemodel');
var async = require('async');

var router = express.Router();

router.get('/', function (req, res, next){ 
    function citylist(cb){
        async.parallel([
            async.apply(citymodel.listCity),
            async.apply(statemodel.listState),
            ],function(error,result){
                if (error) {
                    throw error;
                }
                else{
                    return cb(error, result);
                }
        });

    }

    citylist(function(error,result){
        if (error) {
             res.render('admin/city', {error:error});
        }
        else{
            res.render('admin/city', {data:result[0], listState:result[1], adminname: req.session.adminname });
            console.log('resultka data'+JSON.stringify(result[0]));
        }
    });
    /*async.parallel([
        citymodel.listCity(cb){
            listCity(function() {
            cb(null, cityResult);
            }, 200);
        },
        statemodel.listState(cb){
            listState(function() {
            cb(null, stateResult);
            }, 200);
        }
        ],function(error,result){
            console.log('result ka data123: '+result);
            if (error) {
                res.render('admin/city',{error:error});
            }
            else{
                res.render('admin/city',{data:result, listState:result});
            }
    });*/
});
    /*citymodel.listCity(function(error, result){
        console.log('result ka data123', error,result)

        if (error) {
            res.render('admin/city', {error:error});
        }
        else
        {   
            var listCity = result;
            statemodel.listState(function(error,result){

                if (error) {
                    throw error;
                }
                else{
                    res.render('admin/city', {data:listCity, listState:result}); 
                    console.log('city ka data'+JSON.stringify(result), 'statek '+JSON.stringify(result));     
                }
            });
            //res.render('admin/city', {data:result});

        }
    });*/ 
    


/*router.get('/addcity', function(req, res, next){
    statemodel.listState(function(error, result){
        if (error) {
            res.render('admin/addcity', {error:error});
        }
        else{
            res.render('admin/addcity', {data:result});
            console.log('adj'+result);
        }

    });
});*/

router.post('/addcitydata', function(req, res, next){
    console.log('req.body:', req.body);
    var formdata = JSON.parse(req.body.formdata)[0];
    console.log('formdata:'+formdata, formdata.cname);
    var formfielddata = {
        statename: formdata.statename,
        cityname: formdata.cityname,
        sts : '0'
    }
    
    console.log("add data"+ formfielddata, JSON.stringify(formfielddata));

    citymodel.addCity(formfielddata, function(error, result){
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

// router.get('/updatecity', function(req, res, next){
//     var cid=req.query.cityid;
//     console.log('hello this is'+cid);
//     citymodel.getCityById(cid, function(error, result){
//         if (error) {
//             res.render('updatecity', {error:error});
//         }
//         else{
//             var citydata=result;
//             statemodel.listState(function(error, result){
//                 if (error) {
//                     res.render('updatecity', {error:error});
//                 }
//                 else{
//                     res.render('updatecity', {data:citydata, stateList:result});
//                 }
//             });

//         }
//     });
//     //res.render('updatecity');
// });

router.post('/updatecitydata', function(req, res, next){
    var formfielddata2={
        cid:req.body.cid,
        sname:req.body.sid,
        cname:req.body.cname
    }
    console.log(formfielddata2);
    citymodel.updateCity(formfielddata2, function(error, result){
        if (error) {
            res.redirect('/admin/city');
            console.log("data of update");
        }
        else{
            res.redirect('/admin/city');
        }
    });
});

router.post('/delete', function(req, res, next) {
var cityid  = req.body.cityid;
console.log('id of delete'+cityid);
  citymodel.deleteCity(cityid, function(err, result){
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