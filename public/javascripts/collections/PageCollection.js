define(['underscore', 'backbone', 'models/PageModel'], function(_, Backbone, PageModel) {
	var PageCollection;
	
	return PageCollection = Backbone.Collection.extend({
		model : PageModel
	});       
});