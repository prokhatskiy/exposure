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
        page: 1,
		Model : GalleryItemModel,

        initialize: function() {
            Events.on('gallery:update', this.update.bind(this));
        },

        update: function() {
            var page = this.page++;

            helper.getCachedData(this.url + '/' + page + '.json', function(data){
                this.add(data);
            }, this);

            return this;
        }

	});

    return GalleryCollection;
});