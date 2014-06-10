define(['underscore', 'backbone'], function(_, Backbone) {
	var PageModel;
	
	return PageModel = Backbone.Model.extend({
		defaults : {
			'headImgSrc' : '',
			'content' : '',
			'nextLink' : '',
			'prevLink' : '',
			'isVisible' : true
		},
		toggleVisibility : function() {
			return !this.get(isVisible);
		}	
	});       
});