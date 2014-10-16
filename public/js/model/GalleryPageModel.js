define(['backbone', 'helper', 'router/Url'], function(Backbone, helper, URL) {

    var GalleryPageModel = Backbone.Model.extend({
        defaults : {
            type: 'galleryPage',
            pageId: '',
            title: '',
            totalPhotos: 0,
            description: '',
            date_create: '',
            date_update: '',
            primary: {
                small: '',
                medium: '',
                large: ''
            },
            photos: []
        },
        url : URL.galleryPage,
        update : function() {
            helper.getCachedData(this.url(this.id), function(data){
                this.set(data);
            }, this);
        }
    });

    return GalleryPageModel;
});