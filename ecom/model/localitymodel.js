var pool = require('../util/dbconnection');

var localityObj={
    addLocality:function(inputData, cb){
        var sql= "insert into locality(localityname, cityid, creationdate, updationdate, status) values('"+inputData.locname+"', '"+inputData.cityid+"', now(), now(), "+inputData.sts+")";
        console.log("query"+sql)        ;
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
    listLocality:function(cb){
        var where = '';
        where = "where l.status = '0'"; 
        var sql= "select * from locality as l left join city c on l.cityid = c.cityid "+where;
        
        console.log("locality "+sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
        console.log("locality ",error, result);

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
    getLocalityById:function(id, cb){
        var sql= "select * from locality where localityid="+id;
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

    updateLocality:function(inputData, cb){
        var sql= "update locality set localityname='"+inputData.lname+"', cityid='"+inputData.cityid+"', updationdate=now() where localityid="+inputData.locid;
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

    deleteLocality: function(cid, cb){
        var sql= "update locality set status = '-1' where localityid="+cid;
        console.log('delete locality'+sql);
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
    }
   }
            
module.exports = localityObj;