define(['underscore', 'backbone', 'text!templates/aboutTemplate.html', 'Events'], 
	function(_, Backbone, aboutTemplate, Events) {

		var AboutView = Backbone.View.extend({
			tagName : 'section',
			className : 'about-page about-page_hide',	
			showClass : 'about-page_show',
			hideClass : 'about-page_hide',
			$DOMel : $('#content'),

			initialize: function() {
				Events.trigger('load:start');
				this.render();
				Events.trigger('load:end');
				return this;
			},

			_tmp : _.template(aboutTemplate),

			render : function(data) {
				this.$el.html(this._tmp(data));
				this.$DOMel.append(this.$el);
				return this;
			}
		});   

		return AboutView;    
	}
);