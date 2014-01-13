define(['underscore', 'backbone'], function(_, Backbone) {
	return GalleryItemModel = Backbone.Model.extend({
		defaults : {
			"src"   : '',
			"title" : '',
			"descr" : ''
		}
	});       
});