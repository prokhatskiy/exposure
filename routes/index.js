var express = require('express');
var config = require('../config.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', {
      title: config.title,
      lastUpdateTime: new Date().getTime()
  });

});

//REST API
router.get('/services/gallery/*', function(req, res) {
    var page = req.params[0];

    res.send([{
        "src"        : "1",
        "href"       : "2",
        "className"  : "3",
        "title"      : "4",
        "descr"      : "5"
    }]);
});


module.exports = router;
