define(['underscore', 'backbone', 'text!templates/galleryItemTemplate.html', 'models/GalleryModel'], 
	function(_, Backbone, galleryItemTemplate, GalleryModel) {

		var GalleryItemView = Backbone.View.extend({
			tagName : 'article',
			className : 'gallery__item',
			tpl : _.template(galleryItemTemplate),

			initialize: function() {
				this.model = new GalleryModel(this.options.data);
				this.render();
			},

			render : function() {
				this.$el.html(this.tpl(this.model.toJSON()));
				return this;
			}
		});   

		return GalleryItemView;       
	}
);