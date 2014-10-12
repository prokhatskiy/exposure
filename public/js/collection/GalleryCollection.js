define(['jquery',
        'underscore',
        'backbone',
        'helper',
        'Events',
        'router/Url',
        'model/GalleryItemModel'], function($, _, Backbone, helper, Events, URL, GalleryItemModel) {

	var GalleryCollection = Backbone.Collection.extend({
        url: URL.gallery,
        model: GalleryItemModel,
        page: 0,

        initialize: function() {
            Events.on('gallery:update', this.update.bind(this));
        },

        update: function() {
            helper.getCachedData(this.url(this.page), function(data){
                this.add(data);
            }, this);

            this.page++;

            return this;
        }

	});

    return GalleryCollection;
});