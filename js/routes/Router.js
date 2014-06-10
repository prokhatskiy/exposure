define(['underscore', 'backbone', 'Events'], function(_, Backbone, Events) {
	var Router;

	return Router = Backbone.Router.extend({
		defaultPath : "/",		
		routes: {
			"" : "gallery",
			"page/:id" : "page",
			"about"  : "about",
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
		},

		about : function() {
			Events.trigger('about:open');
		}
	});       
});