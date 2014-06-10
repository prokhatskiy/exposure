define(['underscore', 'backbone', 'text!templates/galleryItemTemplate.html'], function(_, Backbone, galleryItemTemplate) {
	var GalleryItemView;
	
	return GalleryItemView = Backbone.View.extend({
		tagName : 'article',
		className : 'gallery__item',
		_tpl : _.template(galleryItemTemplate),

		initialize: function(model) {
			this.model = model;
			this.render();
		},

		render : function() {
			var data = this.model.toJSON();
			this.$el.html(this._tpl(data));
			this.$el.addClass(data.className);
			this.model.set('isRendered', true)
			return this;
		}
	});        
});