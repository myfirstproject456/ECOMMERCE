var pool = require('../util/dbconnection');

var categoryObj= {
    addCat:function(inputData, cb){
    var sql= "insert into category(categoryname, parentcategoryid, creationdate, updationdate, status) values('"+inputData.catname+"', '"+inputData.parentid+"', now(), now(), "+inputData.sts+")";
    console.log("cat data" +sql);
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

      listCategory: function(parentcategoryid, cb){
        var where = '';
        where = "where a.status = '0'";
        if (parentcategoryid !== '') {
            where = " where a.parentcategoryid= "+parentcategoryid;
        }
        var sql = "select a. * , b.categoryname parentcatname from category a left join category b on a.parentcategoryid = b.categoryid "+where;
        // console.log('category'+ sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                    if (error) {
                        cb(error,null);    
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },

    getCategoryById:function(id, cb){
        var sql= "select * from category where categoryid="+id;
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
     updateCategory: function(inputData, cb){
        var sql = "update category set categoryname='"+inputData.cname+"', parentcategoryid="+inputData.pid+", updationdate=now() where categoryid="+inputData.cid;
        console.log('query is nodk='+sql);
        pool.getConnection(function(error, connection){
            if(error){
                console.log('connection, error'+ error);
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
    
    deleteCategory: function(cid, cb){
        var sql = "update category set status = '-1' where categoryid="+cid;
        console.log('delete category'+sql);
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
    }
}


module.exports = categoryObj;