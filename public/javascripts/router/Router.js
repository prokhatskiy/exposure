define(['underscore', 'backbone', 'Events', 'App', 'view/GalleryView'], function(_, Backbone, Events, App, GalleryView) {
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
            if(App.gallery !== undefined) {
                App.gallery.show();
            }
            else {
                App.gallery = new GalleryView();
            }
        },

        openPage: function() {
            if(App.gallery !== undefined) {
                App.gallery.hide();
            }

            console.log(123);
        }
	});       
});