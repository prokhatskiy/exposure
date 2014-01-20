define(['backbone'], function(Backbone) {
	return GalleryItemModel = Backbone.Model.extend({
		defaults : {
			'src'       : '',
			'href'      : '',
			'className' : '',
			'title'     : '',
			'descr'     : ''
		}
	});       
});