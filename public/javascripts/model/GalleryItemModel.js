define(['backbone'], function(Backbone) {
	var GalleryItemModel = Backbone.Model.extend({
		defaults : {
			'src'        : '',
			'href'       : '',
			'className'  : '',
			'title'      : '',
			'descr'      : ''
		}
	});

    return GalleryItemModel;
});