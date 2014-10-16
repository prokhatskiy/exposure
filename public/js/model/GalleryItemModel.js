define(['backbone'], function(Backbone) {
	var GalleryItemModel = Backbone.Model.extend({
		defaults : {
            type: 'galleryItem',
            id: '',
            src: {
                small: '',
                medium: '',
                large: ''
            },
            photos: '',
            title: '',
            descripiton: '',
            count_view: 0,
            count_comments: 0
		}
	});

    return GalleryItemModel;
});