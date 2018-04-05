var pool = require('../util/dbconnection');

var stateObject=
{
    addState: function(inputData, cb)
    {
        var sql = "insert into state(statename, createdate, updationdate, status) values('"+inputData.statename+"', now(), now(), "+inputData.sts+")";
        console.log("query is done"+sql);        
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error');
            }
            else
            {
                connection.query(sql, function(error, result){
                    // console.log('state ka data query', error, result)
                    
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
    listState: function(cb)
    {
        var sql = "select * from state where status = 0";
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error');
            }
            else
            {
                connection.query(sql, function(error, result){
                    // console.log('state ka data',error, result)

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

    getStateById: function(mid, cb)
    {
        var sql = "select * from state where stateid="+mid;
        console.log(sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log("this is connection error");
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

    updateState: function(inputData, cb)
        {
        // var sid = req.body.sid;
         var sql = "update state set statename='"+inputData.sname+"', updationdate=now() where stateid="+inputData.sid;
        console.log("this is update="+sql);
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
    deleteState: function(sid, cb)
    {
        var sql = "update state set status = '-1' where stateid="+sid;
        console.log("delete data"+sql);
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

module.exports = stateObject;