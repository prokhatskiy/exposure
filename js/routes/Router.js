define(['underscore', 'backbone', 'Events'], 
	function(_, Backbone, Events) {

		var Router = Backbone.Router.extend({
			defaultPath : "gallery",			
			routes: {
				"gallery" : "gallery",
				"page(/:id)" : "page",
				"*path" : "default"
			},

			default : function() { 
				document.location.hash = this.defaultPath;
			},

			gallery : function() {				
				Events.trigger('gallery:open');
			},

			page : function(id) {
				Events.trigger('page:open', id);
			}
		});   

		return Router;       
	}
);