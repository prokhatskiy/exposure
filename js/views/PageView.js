define(['underscore', 'backbone', 'models/PageModel', 'text!templates/pageTemplate.html', 'Events'], 
	function(_, Backbone, PageModel, pageTemplate, Events) {

		var PageView = Backbone.View.extend({
			tagName : 'section',
			className : 'page page_hide',	
			showClass : 'page_show',
			hideClass : 'page_hide',
			$DOMel : $('body'),
			url : undefined,
			visible : false,

			initialize: function() {
				this.load(this.options.url);
				return this;
			},

			_tmp : _.template(pageTemplate),

			render : function(data) {
				this.$el.html(this._tmp(data));
				this.$DOMel.append(this.$el);
				this.show();
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
			},

			load : function(url) {
				Events.trigger('load:start');
				$.ajax({
					url: '/data/page/' + url + '.json',
					dataType: 'json',
					data: {
						url : url
					}
				})
				.done($.proxy(function(data) {
					this.url = url;
					this.render(data);
				}, this))
				.fail($.proxy(function() {
					Events.trigger('error', 'Ajax Error');
				}, this))
				.always($.proxy(function() {
					Events.trigger('load:end');
				}, this));		

				return this;
			}
		});   

		return PageView;    
	}
);