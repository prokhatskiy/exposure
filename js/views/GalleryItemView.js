define(['underscore', 'backbone', 'text!templates/galleryItemTemplate.html', 'models/GalleryModel'], 
	function(_, Backbone, galleryItemTemplate, GalleryModel) {

		var GalleryItemView = Backbone.View.extend({
			tagName : 'article',
			className : 'gallery__item',
			_tpl : _.template(galleryItemTemplate),

			initialize: function() {
				this.model = new GalleryModel(this.options.data);
				this.render();
			},

			render : function() {
				var data = this.model.toJSON();
				this.$el.html(this._tpl(data));
				this.$el.addClass(data.className);
				return this;
			}
		});   

		return GalleryItemView;       
	}
);