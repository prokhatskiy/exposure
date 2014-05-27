define(['underscore', 'backbone', 'text!templates/aboutTemplate.html', 'Events'], 
	function(_, Backbone, aboutTemplate, Events) {

		var AboutView = Backbone.View.extend({
			tagName : 'section',
			className : 'about-page about-page_hide',	
			showClass : 'about-page_show',
			hideClass : 'about-page_hide',
			$DOMel : $('#content'),

			initialize: function() {
				this.render();
				return this;
			},

			_tmp : _.template(aboutTemplate),

			render : function(data) {
				this.$el.html(this._tmp(data));
				this.$DOMel.append(this.$el);
				this.show();
				return this;
			},

			show : function() {
				this.$el.removeClass(this.hideClass);
				this.$el.addClass(this.showClass);
				return this;
			},

			hide : function() {
				this.$el.removeClass(this.showClass);
				this.$el.addClass(this.hideClass);
				return this;
			}
		});   

		return AboutView;    
	}
);