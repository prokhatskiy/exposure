var Flickr = require('flickrapi');
var config = require('../config.js');
var fs = require('fs');
var wrench = require('wrench');
var _ = require('lodash');

var flickrOptions = {
        api_key: config.FLICKR.KEY,
        secret: config.FLICKR.SECRET
    };

var flickrData = {};


var deploy = {
    init : function(res) {
        var _this = this,
            pathGallery = config.GALLERY.FOLDER_PATH + '/' + config.GALLERY.FOLDER_NAME;

        wrench.mkdirSyncRecursive(pathGallery);

        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            _this.fetchDataFromFlickr(flickr, function() {
                _this.saveGalleryList();
                //_this.saveGaleryPages();
                res.send(flickrData);
            });
        });
    },

    flickErrorHandler : function(error) {
        console.log(error.message);
    },

    fetchDataFromFlickr :function(flickr, callback) {
        this.fetchGalleries(flickr, function() {
            this.fetchGalleryPages(flickr, function() {
                this.fetchPhotoSizes(flickr, callback);
            }.bind(this));
        }.bind(this));
    },

    fetchGalleries : function(flickr, callback) {
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
    },

    fetchGalleryPages : function(flickr, callback) {
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
    },

    fetchPhotoSizes : function(flickr, callback) {
        flickrData.allPhotos = [];
        flickrData.photoSizes = [];

        flickrData.photosetPages.forEach(function(photoset) {
            flickrData.allPhotos = _.union(flickrData.allPhotos, photoset.photo);
        });

        if(flickrData.allPhotos.length > 0) {
            getPhotoSize(flickrData.allPhotos[0]['id']);
            var i = 0;
        }

        function getPhotoSize(photoId) {
            flickr.photos.getSizes({
                photo_id : photoId,
                format : 'json'
            }, function(err, result) {
                flickrData.photoSizes.push(result.sizes.size);
                i++;
                if(i < flickrData.allPhotos.length) {
                    getPhotoSize(flickrData.allPhotos[i]['id']);
                }
                else {
                    if(typeof callback === 'function') {
                        callback();
                    }
                }
            });
        }
    },

    saveGalleryList : function() {
        var items = flickrData.photosets,
            pageNum = 0,
            itemsOnPage = 0,
            json = [],
            path = config.GALLERY.FOLDER_PATH + '/' + config.GALLERY.FOLDER_NAME;

        wrench.rmdirSyncRecursive(path);
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
    },

    saveGaleryPages : function() {

    },

    mapGalleryItemData : function(flickrObj) {
        return {
            id : flickrObj.id,
            src : this.getPrimaryPhotos(flickrObj.id),
            photos : flickrObj.photos,
            title : flickrObj.title._content,
            descripiton : flickrObj.description._content,
            count_view : flickrObj.count_view,
            count_comments : flickrObj.count_comments
        };
    },

    getPrimaryPhotos : function(galleryId) {
        var photoId = _.where(flickrData.photosetPages, { 'id' : galleryId })[0]['primary'];
        return {
            'regular' : this.getPhotoSrc(photoId, 'm'),
            'mobile'  :  this.getPhotoSrc(photoId, 'n'),
            'retina'  : this.getPhotoSrc(photoId, 'z')
        }
    },

    getPhotoSrc : function(photoId, size) {
        //https://www.flickr.com/services/api/misc.urls.html
        var photoObj = _.where(flickrData.allPhotos, { 'id' : photoId })[0];
        return 'https://farm' + photoObj.farm + '.staticflickr.com/' + photoObj.server + '/' + photoObj.id + '_' + photoObj.secret + '_' + size + '.jpg'
    }
}

module.exports = deploy;