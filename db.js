var MongoClient = require('mongodb').MongoClient;
var config = require('./config.js')
var assert = require('assert');

// Connection URL
var url =  'mongodb://' + config.DB.USER + ':' + config.DB.PASSWORD + '@' + config.DB.SERVER + '/' + config.DB.NAME + config.DB.PARAMS

function Db(callback) {
    this.connect(function(db) {
        if(typeof callback === 'function') callback(db).bind(this);
    });
};

Db.prototype.connect = function(callback) {
    MongoClient.connect(url, function(err, db) {
        if(typeof callback === 'function') callback(db);
    });
};

Db.prototype.setLastUpdateDate = function(db, callback) {
    var collection = db.collection('userSettings');
    var time = new Date().getTime();

    collection.remove({title : 'lastUpdateTime'}, function(err, result) {
        collection.insert([{title : 'lastUpdateTime', value : time}], function(err, result) {
            if(typeof callback === 'function') callback(result);
        });
    });
};

Db.prototype.saveGallery = function(data, db, callback) {
    var collection = db.collection('gallery');

    collection.remove({type: 'galleryItem'}, function(err, result) {
        collection.insert(data, function(err, result) {
            if(typeof callback === 'function') callback(result);
        });
    });
};

Db.prototype.saveGalleryPages = function(data, db, callback) {
    var collection = db.collection('galleryPages');

    collection.remove({type: 'galleryPage'}, function(err, result) {
        collection.insert(data, function(err, result) {
            if(typeof callback === 'function') callback(result);
        });
    });
};

Db.prototype.getGalleryPages = function(page, callback) {
    this.connect(function(db) {
        var collection = db.collection('gallery');

        collection.find(
            {
                'type' : 'galleryItem'
            },
            {
                limit : config.GALLERY.ITEMS_PER_PAGE,
                skip : page * config.GALLERY.ITEMS_PER_PAGE
            },
            function(err, docs) {
                db.close();
                docs.toArray(function(err, docs) {
                    if(typeof callback === 'function') callback(docs);
                });
            }
        );
    });
};

Db.prototype.getPage = function(id, callback) {
    this.connect(function(db) {
        var collection = db.collection('galleryPages');

        collection.findOne(
            {
                type : 'galleryPage',
                pageId: id
            },
            function(err, doc) {
                db.close();
                if(typeof callback === 'function') callback(doc);
            }
        );
    });
};

Db.prototype.getCommonData = function(callback) {
    this.connect(function(db) {
        var collection = db.collection('userSettings');

        collection.findOne({'title' : 'lastUpdateTime'}, function(err, doc) {
            var data = {
                lastUpdateTime : doc
            }

            db.close();
            if(typeof callback === 'function') callback(data);
        });
    });
};

module.exports = Db;