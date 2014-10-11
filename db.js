var MongoClient = require('mongodb').MongoClient;
var config = require('./config.js')
var assert = require('assert');

// Connection URL
var url =  'mongodb://' + config.DB.USER + ':' + config.DB.PASSWORD + '@' + config.DB.SERVER + '/' + config.DB.NAME + config.DB.PARAMS

function Db(flickr) {};

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

module.exports = Db;