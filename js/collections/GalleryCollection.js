define(['underscore', 'backbone', 'models/GalleryItemModel'], function(_, Backbone, GalleryItemModel) {
	return GalleryCollection = Backbone.Collection.extend({
		model : GalleryItemModel
	});       
});