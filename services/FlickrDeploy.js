var Flickr = require('flickrapi');
var config = require('../config.js');
var fs = require('fs');
var wrench = require('wrench');
var _ = require('lodash');
var Db = require('./Db.js');

var flickrOptions = {
    api_key: config.FLICKR.KEY,
    secret: config.FLICKR.SECRET
};

var flickrData = {};

var Deploy = function(responce) {
    this.init(responce);
};

Deploy.prototype.init = function(res) {
    var pathGallery = config.GALLERY.FOLDER_PATH + '/' + config.GALLERY.FOLDER_NAME;

    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        this.fetchDataFromFlickr(flickr, function() {
            if(config.CREATE_JSON_FILE) {
                this.saveGalleryList();
                this.saveGalleryPages();
            }

            if(config.SAVE_TO_DB) {
                this.updateDb();
            }

            res.send(flickrData);
        }.bind(this));
    }.bind(this));
};

Deploy.prototype.fetchDataFromFlickr = function(flickr, callback) {
    this.fetchGalleries(flickr, function() {
        this.fetchGalleryPages(flickr, function() {
            this.fetchPhotos(flickr, callback);
        }.bind(this));
    }.bind(this));
};

Deploy.prototype.fetchGalleries = function(flickr, callback) {
    flickr.photosets.getList({
        user_id : config.FLICKR.USER_ID,
        page: config.FLICKR.START_PAGE,
        per_page : config.FLICKR.PAGES,
        format : 'json'
    }, function(err, result) {
        flickrData.photosets = result.photosets.photoset;

        if(typeof callback === 'function') {
            callback();
        }
    });
};

Deploy.prototype.fetchGalleryPages = function(flickr, callback) {
    flickrData.photosetPages = [];
    if(flickrData.photosets.length > 0) {
        var i = 0;
        getPhotos(flickrData.photosets[0]['id']);
    }

    function getPhotos(photosetId) {
        flickr.photosets.getPhotos({
            photoset_id : photosetId,
            format : 'json'
        }, function(err, result) {
            flickrData.photosetPages.push(result.photoset);
            i++;
            if(i < flickrData.photosets.length) {
                getPhotos(flickrData.photosets[i]['id']);
            }
            else {
                if(typeof callback === 'function') {
                    callback();
                }
            }
        });
    }
};

Deploy.prototype.fetchPhotos = function(flickr, callback) {
    flickrData.allPhotos = [];
    flickrData.allPhotoInfo = [];

    flickrData.photosetPages.forEach(function(photoset) {
        flickrData.allPhotos = _.union(flickrData.allPhotos, photoset.photo);
    });

    if(flickrData.allPhotos.length > 0) {
        getPhotosInfo(flickrData.allPhotos[0]['id']);
        var i = 0;
    }

    function getPhotosInfo(photoId) {
        flickr.photos.getInfo({
            photo_id : photoId,
            format : 'json'
        }, function(err, result) {
            flickrData.allPhotoInfo.push(result.photo);
            i++;
            if(i < flickrData.allPhotos.length) {
                getPhotosInfo(flickrData.allPhotos[i]['id']);
            }
            else {
                if(typeof callback === 'function') {
                    callback();
                }
            }
        });
    }
};

Deploy.prototype.saveGalleryList = function() {
    var items = flickrData.photosets,
        pageNum = 0,
        itemsOnPage = 0,
        json = [],
        path = config.GALLERY.FOLDER_PATH + '/' + config.GALLERY.FOLDER_NAME;

    wrench.rmdirSyncRecursive(path, true);
    wrench.mkdirSyncRecursive(path);

    for(var i = 0; i < items.length; i++) {
        if(itemsOnPage < config.GALLERY.ITEMS_PER_PAGE) {
            json.push(this.mapGalleryItemData(items[i]));
            itemsOnPage++;
        }

        if(itemsOnPage === config.GALLERY.ITEMS_PER_PAGE || i === items.length - 1){
            fs.writeFile(path + '/' + config.GALLERY.FILE_PREFIX + pageNum + '.json', JSON.stringify(json));
            pageNum++;
            itemsOnPage = 0;
        }
    }
};

Deploy.prototype.saveGalleryPages = function() {
    var items = flickrData.photosetPages,
        json = {},
        path = config.PAGE.FOLDER_PATH + '/' + config.PAGE.FOLDER_NAME;

    wrench.rmdirSyncRecursive(path, true);
    wrench.mkdirSyncRecursive(path);

    for(var i = 0; i < items.length; i++) {
        json = this.mapGalleryPage(items[i]);
        fs.writeFile(path + '/' + config.PAGE.FILE_PREFIX + items[i].id + '.json', JSON.stringify(json));
    }
};

Deploy.prototype.mapGalleryPage = function(flickrObj) {
    var photosetObj = _.where(flickrData.photosets, {'id' : flickrObj.id })[0];

    var result =  {
        type : 'galleryPage',
        pageId : flickrObj.id,
        title :flickrObj.title,
        totalPhotos : flickrObj.total,
        description : photosetObj.description._content,
        date_create : photosetObj.date_create,
        date_update : photosetObj.date_update,
        primary : {
            'small'  :  this.getPhotoSrc(flickrObj.primary, 'c'),
            'medium' : this.getPhotoSrc(flickrObj.primary, 'b'),
            'large'  : this.getPhotoSrc(flickrObj.primary, 'o')
        },
        photos : []
    };

    for(i = 0; i < flickrObj.photo.length; i++) {
        var photoObj = _.where(flickrData.allPhotoInfo, {'id' : flickrObj.photo[i].id })[0];

        result.photos.push({
            id : flickrObj.photo[i].id,
            title : flickrObj.photo[i].title,
            isprimary : !!parseInt(flickrObj.photo[i].isprimary),
            description : photoObj.description._content,
            flickrUrl : photoObj.urls.url[0]._content,
            tags : photoObj.tags,
            src : {
                'small'  :  this.getPhotoSrc(flickrObj.photo[i].id, 'c'),
                'medium' : this.getPhotoSrc(flickrObj.photo[i].id, 'b'),
                'large'  : this.getPhotoSrc(flickrObj.photo[i].id, 'o')
            }
        });
    }

    return result;
};

Deploy.prototype.mapGalleryItemData = function(flickrObj) {
    return {
        type : 'galleryItem',
        id : flickrObj.id,
        src : this.getPrimaryPhotos(flickrObj.id),
        photos : flickrObj.photos,
        title : flickrObj.title._content,
        descripiton : flickrObj.description._content,
        count_view : flickrObj.count_view,
        count_comments : flickrObj.count_comments
    };
};

Deploy.prototype.getPrimaryPhotos = function(galleryId) {
    var photoId = _.where(flickrData.photosetPages, { 'id' : galleryId })[0]['primary'];
    return {
        'small'  :  this.getPhotoSrc(photoId, 'n'),
        'medium' : this.getPhotoSrc(photoId, 'm'),
        'large'  : this.getPhotoSrc(photoId, 'z')
    }
};

Deploy.prototype.getPhotoSrc = function(photoId, size) {
    //https://www.flickr.com/services/api/misc.urls.html
    var photoObj = _.where(flickrData.allPhotos, { 'id' : photoId })[0];
    return 'https://farm' + photoObj.farm + '.staticflickr.com/' + photoObj.server + '/' + photoObj.id + '_' + photoObj.secret + '_' + size + '.jpg'
};

Deploy.prototype.updateDb = function() {
    var mongoDB = new Db();
    var galleryJson = [];
    var pagesJson = [];

    for(var i = 0; i < flickrData.photosets.length; i++) {
        galleryJson.push(this.mapGalleryItemData(flickrData.photosets[i]));
    }

    for(var i = 0; i < flickrData.photosetPages.length; i++) {
        pagesJson.push(this.mapGalleryPage(flickrData.photosetPages[i]));
    }

    mongoDB.connect(function(db) {
        mongoDB.saveGallery(galleryJson, db, function() {
            mongoDB.saveGalleryPages(pagesJson, db, function() {
                mongoDB.setLastUpdateDate(db, function() {
                    db.close();
                });
            });
        });
    });
};

module.exports = Deploy;