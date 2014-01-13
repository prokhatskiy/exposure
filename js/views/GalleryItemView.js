define(['underscore', 'backbone', 'text!templates/galleryItemTemplate.html'], 
	function(_, Backbone, GalleryItemModel, galleryItemTemplate) {

		var GalleryItemView = Backbone.View.extend({
			tagName : 'article',
			className : 'gallery__item',
			template : _.template(galleryItemTemplate, this.model.toJSON),

			render : function() {
				this.$el.html(this.template);
				return this;
			}
		});   

		return GalleryItemView;       
	}
);