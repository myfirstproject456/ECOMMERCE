var pool = require('../util/dbconnection');
var files = [];
var params ='';
var productObj = {
    // addProduct: function(inputData, cb){
    //     for (var i = files.length; i < 10; i++) {
    //         files.push("");
    //     }
        
    //     var sql = "insert into products (title, tagskeys, discription, categoryid, sub_categoryid, status, creationdate, updationdate, price,sts,img,img2, imgurl3, imgurl4, imgurl5, imgurl6, imgurl7, imgurl8, imgurl9, imgurl10) values('"+inputData.tit+"', '"+inputData.tags+"', '"+inputData.dis+"', '"+inputData.c1name+"', '"+inputData.scat+"', '"+inputData.status+"', now(), now(), "+inputData.price+","+inputData.sts+",'"+inputData.img+"','"+inputData.img2+"', '"+inputData.imgurl3+"', '"+inputData.imgurl4+"','"+inputData.imgurl5+"', '"+inputData.imgurl6+"', '"+inputData.imgurl7+"', '"+inputData.imgurl8+"', '"+inputData.imgurl9+"', '"+inputData.imgurl10+"')";
    //     console.log('inside in sql'+sql);
    //     pool.getConnection(function(error, connection){
    //         if (error) {
    //             console.log('connection error'+error);
    //         }
    //         else{
                
    //             connection.query(sql, params, function(error, result){
    //                 console.log('product ka result',error, result)

    //                 if (error) {
    //                     cb(error, null);
    //                 }
    //                 else{
    //                     console.log('inside result');
    //                     cb(null, result);
    //                 }
    //             });
    //             connection.release();
    //         }
    //     });
    // },

    addImage:function(inputData, cb){
        var sql = "insert into images(productid, images, ext) values("+inputData.pid+",'"+inputData.img+"', '"+inputData.ext+"')";
        console.log('This is images query '+sql);
         pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        console.log('inside result');
                        cb(null, result);
                    }
                });
                connection.release();
            }
        });
    },

    
 listProductCount:function(cb)
    {  
        var sql = "select count(*) as cnt from products";
        // console.log(sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    console.log('final01', error,result);
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },

    pagiNation:function(page, cb)
    {    
        var start;
        start = (page-1)*9;
        if (page) {
            var sql = "select `pid`, `title`, `tagskeys`, `discription`, `categoryid`, `sub_categoryid`, `status`, `price`, `sts`, `img`, `img2`, `imgurl4` from products limit "+start+", 9";
        }else{
            var sql = "select `pid`, `title`, `tagskeys`, `discription`, `categoryid`, `sub_categoryid`, `status`, `price`, `sts`, `img`, `imgurl4` from products";
        }
        
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },

    searchProduct:function(search,pricefrom,priceto,cb){
        console.log('fn123', search,pricefrom,priceto);
        var where ='';
        // where = "title = % LIKE %"
        if (search) {
        where += " title LIKE '%"+search+"%'";    
        }else{
        where += " title LIKE '%"+search+"%' AND price > "+pricefrom+" AND price <= "+priceto;
        }
        if (search || pricefrom || priceto) {
            var sql ="select * from products where sts = '0' AND "+where;
        }
        else{
            var sql ="select * from products where sts = '0'";
        }
         console.log('1245', sql);
        
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },

    getProductById: function(id, cb){
        var sql = "select * from products where pid="+id;
        console.log('query is working='+sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },
    
    deleteProduct: function(pid, cb){
        var sql = "update products set sts = '-1' where pid="+pid;
        console.log('query is working='+sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },
       updateProduct:function(inputData, cb){
        var sql= "update products set title='"+inputData.tit+"', tagskeys='"+inputData.tags+"', discription='"+inputData.dis+"', categoryid="+inputData.c1name+", sub_categoryid="+inputData.scat+", status="+inputData.status+", price="+inputData.price+" where pid="+inputData.pid;
        console.log("update of product"+sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
        });
    },
    changeStatus: function(inputData, cb){
        var sql = "update products set status='"+inputData.status+"' where pid="+inputData.pid;
        console.log('qeury is woring='+sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },

}

module.exports = productObj;