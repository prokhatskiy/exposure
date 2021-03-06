define(['underscore', 'backbone', 'Events'], function(_, Backbone, Events) {
	var Router;

	return Router = Backbone.Router.extend({
		defaultPath : '/',		
		routes: {
			'' : 'gallery',
			'gallery/:id' : 'openPage',
			'*path' : 'default'
		},

		default : function() { 
			this.navigate(this.defaultPath);
		},

        gallery: function() {
            Events.trigger('gallery:show');
        },

        openPage: function(id) {
            Events.trigger('gallery:hide');
            Events.trigger('page:open', 'galleryPage', id);
        }
	});       
});