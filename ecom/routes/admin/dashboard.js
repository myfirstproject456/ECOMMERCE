var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('admin/dashboard' ,{ adminname: req.session.adminname });
});

module.exports = router;
