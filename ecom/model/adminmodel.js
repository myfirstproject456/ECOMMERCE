var pool = require('../util/dbconnection');

var adminData = {
    adminLogin : function(inputData, cb){
        var sql =" select adminid, adminname from tbl_adminlogin where adminname = '"+inputData.username+"' and adminpassword = '"+inputData.userpassword+"'";
        console.log('query is working='+sql);
        pool.getConnection(function(error, connection){
            if (error) {
               console.log('connection error');
            } 
            else {
                
                connection.query(sql, function(error, result) {

                    if (error) {
                        cb(error, null);
                    } else {
                        cb(null, result);
                    }
                });
            }
        });
        
    }
}
module.exports = adminData;