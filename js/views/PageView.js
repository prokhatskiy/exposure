define(['jquery', 'underscore', 'backbone', 'imagesloaded', 'models/PageModel', 'text!templates/pageTemplate.html', 'Events'], function($, _, Backbone, imagesLoaded, PageModel, pageTemplate, Events) {
	var PageView,

		DEFAULTS = {
			PATH : '/data/page/'
		};

	return PageView = Backbone.View.extend({
		tagName : 'section',
		className : 'page',	
		$DOMel : $('#content'),
		id : undefined,

		initialize: function() {
			this.load(this.options.id);
			return this;
		},

		_tmp : _.template(pageTemplate),

		render : function(data) {
			this.$el.html(this._tmp(data));
			this.$DOMel.append(this.$el);
		},

		load : function(id) {
			Events.trigger('load:start');
			$.ajax({
				id: DEFAULTS.PATH + id + '.json',
				dataType: 'json',
				data: {
					id : id
				}
			})
			.done($.proxy(function(data) {
				this.id = id;
				this.afterLoad(data);
			}, this))
			.fail($.proxy(function() {
				Events.trigger('error', 'Ajax Error');
				Events.trigger('load:end');
			}, this));		

			return this;
		},

		afterLoad : function(data) {
			this.render(data);
			imagesLoaded(this.$el.find('img'), $.proxy(function() {
				Events.trigger('page:hide');
				this.show();
				Events.trigger('load:end');
			}, this));
		}, 

		show : function() {
			this.$el.show();
		},

		hide : function() {
			this.$el.hide();
		}
	});     
});