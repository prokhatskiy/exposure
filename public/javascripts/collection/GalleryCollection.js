define(['jquery', 'underscore', 'backbone', 'models/GalleryItemModel', 'Events', function($, _, Backbone, GalleryItemModel, Events) {
	var GalleryCollection = Backbone.Collection.extend({
        url: '/gallery',
        model: GalleryItemModel,
        page: 0,
		Model : GalleryItemModel,
		initialize : function() {
			this.update(0);
		},
        update: function(page) {
            var page = page || this.page++;

            Events.trigger('load:start');

            $.get( this.url + '/' + page, function(data) {
                this.add(data);
            }.bind(this), 'application/json')
                .fail(function(xhr, ajaxOptions, thrownError) {
                    Events.trigger('error', thrownError)
                })
                .always(function() {
                    Events.trigger('load:end');
                });
        }
	});

    return GalleryCollection;
});