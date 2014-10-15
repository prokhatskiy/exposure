var express = require('express');
var config = require('../config.js');
var Deploy = require('../services/FlickrDeploy.js');
var Db = require('../services/Db.js');

var router = express.Router();

//helper functions
function send404(res) {
    res.writeHead(404);
    res.end();
}

//home page
router.get(config.ROUTES.INDEX, function(req, res) {
    new Db(function(db) {
        this.getCommonData(db, function(data) {
            res.render('index', {
                title : config.TITLE,
                useDb : config.GET_FROM_DB || 0,
                lastUpdateTime : data.lastUpdateTime.value
            });

            db.close();
        });
    });
});

//REST API
if(config.GET_FROM_DB) {
    router.get(config.ROUTES.GALLERY_API, function(req, res) {
        var page = parseInt(req.params.page);

        if(!isNaN(page)) {
            new Db(function(db) {
                this.getGalleryPages(db, page, function(data) {
                    if(data.length !== 0) {
                        res.send(data);
                        res.end();
                    }
                    else {
                        send404(res);
                    }
                    db.close();
                });
            });
        }
        else {
            send404(res);
        }
    });

    router.get(config.ROUTES.PAGE_API, function(req, res) {
        new Db(function(db) {
            this.getPage(db, req.params.id, function(data) {
                if(data !== null) {
                    res.send(data);
                    res.end();
                }
                else {
                    send404(res);
                }
                db.close();
            });
        });
    });
}

//get data from flickr API
router.get(config.ROUTES.DEPLOY_API, function(req, res) {
    var deploy = new Deploy(res);
});

module.exports = router;
