var express = require('express');
var config = require('../config.js');
var gallery = require('../services/gallery.js');
var deploy = require('../services/deploy.js');

var router = express.Router();

/* GET home page. */
router.get(config.ROUTES.INDEX, function(req, res) {
    res.cookie('FLICKR_ACCESS_TOKEN', config.FLICKR.ACCESS_TOKEN, { maxAge: 900000, httpOnly: true });
    res.cookie('FLICKR_TOKEN_SECRET', config.FLICKR.ACCESS_TOKEN_SECRET, { maxAge: 900000, httpOnly: true });

    res.render('index', {
      title: config.TITLE,
      lastUpdateTime: new Date().getTime()
    });
});

//REST API
//router.get(config.ROUTES.GALLERY_API, function(req, res) {
//    res.send(gallery.get(req.params[0]));
//});

router.get(config.ROUTES.DEPLOY_API, function(req, res) {
    var json = deploy.init(res);
    //res.redirect(config.ROUTES.INDEX);
});


module.exports = router;
