router.post('/addproductdata', function(req, res, next){
    console.log('body k data data hai', req.body);
    
    var files = [];

    // var coid = req.session.user.coid;
    var post = req.body;
    console.log("post ka data go"+post);

            tit= post.tit,
            console.log("here is data"+tit);
            tags= post.tags,
            dis=post.dis,
            c1name= post.c1name,
            scat= post.scat,
            price= post.price,
            status= post.status,
            sts = '0'
            console.log("here is status hai="+status);
        

        for (var i = files.length; i < 10; i++) {
            files.push("");
        }

        var query = "INSERT INTO `products` (title, tagskeys, discription, categoryid, sub_categoryid, status, price,sts,img,img2, imgurl3, imgurl4, imgurl5, imgurl6, imgurl7, imgurl8, imgurl9, imgurl10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        console.log("here is query="+query);
        var params = [tit,tags,dis,c1name,scat,status,price,sts];
         console.log("here is params data="+params);           
        for (var i = 0; i < files.length; i++) {
            params.push(files[i]);
        }
        
         pool.query(query ,params, function(err, results){   
            console.log("here is results"+results);
            if (!err && results && results.affectedRows > 0) {

              var resp = {
                status:"0",
                status_msg:"Success"
              };
              // var j = 0;
              var Storage = multer.diskStorage({
                destination: function(req, file, callback) {
                    console.log('req123',file);
                    callback(null, "./public/assets1/Contents");
                },
                filename: function(req, file, callback) {
                    filename = file.originalname;
                    console.log("file name of " + filename);
                    var i = filename.lastIndexOf('.');
                    extesion = (i < 0) ? '' : filename.substr(i);
                   
                    console.log("extesion ofimage "+ extesion);
                    // var fileExtension = require('file-extension');

                    filewithdir = '/Contents/' + filename;
                    console.log("set "+ filewithdir);
                    files.push(filewithdir);

                    console.log("FileArray", files);
                    console.log("Filename", filename);
                    callback(null, filename);
                }
            });

            var upload = multer({
                storage: Storage
            }).array("imgUploader", 10); //Field name and max count 

            
            upload(req, res, function(err) {
                console.log("COntext error", err);
                console.log("COntext body", req.body);

                if (err) {
                    return res.end("Something went wrong!");
                }
               
            });
            var response = JSON.parse(JSON.stringify(resp));
              res.send(response);
              // callback(err,response);
            }else{
             var err_msg="Failed to create task schedules";
             if(err){err_msg = err["sqlMessage"] }
              var resp = {
                status: "1",
                status_msg: err_msg
              };
              var response = JSON.parse(JSON.stringify(resp));
              res.send(response);
              console.log('response hai'+response);
               // callback(err,response);
             }                 
           });
        // callback(null,customerdata);
    });
