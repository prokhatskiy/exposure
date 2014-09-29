define(['underscore', 'backbone'], function(_, Backbone) {
	var GalleryItemModel;

	return GalleryItemModel = Backbone.Model.extend({
		defaults : {
			'src'        : '',
			'href'       : '',
			'className'  : '',
			'title'      : '',
			'descr'      : '',
			'isRendered' : false
		}
	});       
});