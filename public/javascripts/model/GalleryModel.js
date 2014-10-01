define(['backbone'], function(Backbone) {
	var GalleryModel = Backbone.Model.extend({
        defaults : {
            loadMoreLink : 'Load More'
        }
    });

    return GalleryModel;
});