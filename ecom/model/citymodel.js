var pool = require('../util/dbconnection');


var cityObject ={

    addCity:function(inputData, cb){
        var sql = "insert into city(cityname, stateid, creationdate, updationdate, status) values('"+inputData.cityname+"', '"+inputData.statename+"', now(), now(), "+inputData.sts+")";
        console.log('city in query'+sql);
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

    listCity:function(cb)
    {
        var sql ="select c.cityid, c.cityname, c.creationdate, c.updationdate,c.stateid, s.statename from city c inner join state s on c.cityid = s.stateid where c.status = '0';";
        console.log('query: '+sql);
        pool.getConnection(function(error, connection){
            if (error) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(error, result){
                   // console.log('result ka data', error,result)
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
    getCityById:function(cid, cb){
        var sql="select * from city where cityid="+cid;
        console.log('this is my query'+sql);
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
    updateCity: function(inputData, cb){
        var sql = "update city set cityname='"+inputData.cname+"', stateid='"+inputData.sname+"', updationdate=now() where cityid="+inputData.cid;
        console.log('quer is wor='+sql);
        pool.getConnection(function(err, connection){
            if (err) {
                console.log('connection error'+error);
            }
            else{
                connection.query(sql, function(err, result){
                    if (err) {
                        cb(err, null);
                    }
                    else
                    {
                        cb(null, result);
                    }
                });
            }
            connection.release();
        });
    },
    
    deleteCity: function(cid, cb){
        var sql= "update city set status = '-1' where cityid="+cid;
        console.log('delete city'+sql);
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

module.exports = cityObject;