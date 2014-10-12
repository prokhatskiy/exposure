var express = require('express');
var config = require('../config.js');
var deploy = require('../services/deploy.js');
var Db = require('../db.js');

var router = express.Router();
var mongoDB = new Db();

//helper functions
function send404(res) {
    res.writeHead(404);
    res.end();
}

//home page
router.get(config.ROUTES.INDEX, function(req, res) {
    mongoDB.getCommonData(function(data) {
        res.render('index', {
            title : config.TITLE,
            useDb : config.GET_FROM_DB || 0,
            lastUpdateTime : data.lastUpdateTime.value
        });
    });
});

//REST API
if(config.GET_FROM_DB) {
    router.get(config.ROUTES.GALLERY_API, function(req, res) {
        var page = parseInt(req.params.page);

        if(!isNaN(page)) {
            mongoDB.getGalleryPages(page, function(data) {
                if(data.length !== 0) {
                    res.send(data);
                    res.end();
                }
                else {
                    send404(res);
                }
            });
        }
        else {
            send404(res);
        }
    });
}

//get data from flickr API
router.get(config.ROUTES.DEPLOY_API, function(req, res) {
    var json = deploy.init(res);
});

module.exports = router;
