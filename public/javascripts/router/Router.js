define(['underscore', 'backbone', 'Events'], function(_, Backbone, Events) {
	var Router;

	return Router = Backbone.Router.extend({
		defaultPath : '/',		
		routes: {
			'' : 'gallery',
			'/page|about|admin\/(:id)' : 'openPage',
			'*path' : 'default'
		},

		default : function() { 
			this.navigate(this.defaultPath);
		},

        gallery: function() {
            Events.trigger('gallery');
        },

        openPage: function() {

        }
	});       
});