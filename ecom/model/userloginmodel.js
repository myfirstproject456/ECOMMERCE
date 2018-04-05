var pool = require('../util/dbconnection');
var userData = {
    userLogin : function(inputData, cb){
        pool.getConnection(function(err, connection){
            if (err) {
               throw err;     
            } else {
                var sql = "select * from users where (emailid='"+inputData.emailid+"' || mobileno='"+inputData.mobileno+"') and userpassword = '"+inputData.pass+"'";
                console.log('query is working='+sql);
                connection.query(sql,function(err, result) {

                    if (err) {
                        cb(err, null);
                    } else {
                        console.log("admin login="+result);
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
        
    },
    forgetPass: function(inputData, cb){
        pool.getConnection(function(err, connection){
            if (err) {
                throw err;
            }
            else{
                var sql = "select * from users where username='"+inputData.fname+"'";
                console.log("forgetpass userData",sql);
            }
            connection.query(sql,function(err, result){
                if (err) {
                    cb(err, null);
                }
                else{
                    cb(null, result);
                }
            });
        
        connection.release();
        });
    },
    updatePassword: function(inputData, cb){
        pool.getConnection(function(err, connection){
            if (err) {
                throw err;
            }
            else{
                var sql = "update users set userpassword='"+inputData.pass2+"' where userid="+inputData.fid;
                console.log("sql query of forgetpass", sql);
                connection.query(sql, function(err, result){
                    if (err) {
                        cb(err, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
            connection.release();
        })
    }
}
module.exports = userData;
