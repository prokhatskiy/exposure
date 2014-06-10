define(['jquery', 'underscore', 'backbone', 'models/GalleryItemModel', 'Events', 'constants'], function($, _, Backbone, GalleryItemModel, Events, CONST) {
	var GalleryCollection;
	
	return GalleryCollection = Backbone.Collection.extend({
		Model : GalleryItemModel,
		initialize : function() {
			this.bindEvents();
		},
		bindEvents : function() {
			Events.on(CONST.EVENTS.LOADED_GALLERY_ITEMS, $.proxy(this.addModels, this));
		},
		addModels : function(data) {
			var models = [];
			for (var i = 0, l = data.items.length; i < l; i++) {
				this.add(new this.Model(data.items[i]));
			};			
		}
	});       
});