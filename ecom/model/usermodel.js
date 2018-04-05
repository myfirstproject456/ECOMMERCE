var pool = require('../util/dbconnection');

var userObj={
    addUsers:function(inputData, cb){
        var sql= "insert into `users`(`username`, `mobileno`, `emailid`, `status`, `creationdate`, `updationdate`, `sts`) values('"+inputData.uname+"','"+inputData.mob+"', '"+inputData.email+"','"+inputData.status+"', now(), now(), "+inputData.sts+")";
        console.log('users in query'+sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error');
            }
            else
            {
                connection.query(sql, function(error, result){
                    console.log('query ok');
                    if (error) {
                        console.log('here is result');
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

    listUser:function(cb){
        var sql="select * from users where sts = '0';";
         pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error');
            }
            else
            {
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
    getUserByid:function(cid, cb){
        var sql="select * from users where userid="+cid;
        console.log(sql);
         pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error');
            }
            else
            {
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
    updateUser:function(inputData, cb){
        var sql ="update `users` set `username`='"+inputData.uname+"', `mobileno`='"+inputData.mob+"', `emailid`='"+inputData.email+"', `status`='"+inputData.status+"', `updationdate`=now() where `userid`="+inputData.uid;
        console.log('update ka data'+sql);
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
    deleteUser:function(cid, cb){
        var sql="update users set sts = '-1' where userid="+cid;
        console.log(sql);
         pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error');
            }
            else
            {
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
        var sql = "delete from category where categoryid="+cid;
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



module.exports = userObj;

