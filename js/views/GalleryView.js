define(['underscore', 'backbone', 'Events', 'models/GalleryModel', 'text!templates/galleryTemplate.html', 'views/GalleryItemView'], 
	function(_, Backbone, Events, GalleryModel, GalleryCollection, galleryTemplate, GalleryItemVie) {

		var GalleryView = Backbone.View.extend({
			tagName : 'section',
			className : 'gallery',	
			model : new GalleryModel(),
			tpl : _.template(galleryTemplate),
			$DOMel : $('body'),
			page : 1,
			loadClass : 'gallery_load',
			items : [],

			initialize: function() {
				this.place();
				this.load();
			},

			events : {
				'click .gallery__more-btn' : 'load'
			},

			render : function() {				
				this.$el.html(this.tpl(this.model.toJSON()));
				this.$moreBtn = this.$el.find('.gallery__more-btn');
				return this;
			},

			place : function() {
				return this.$DOMel.append(this.render());
			},

			load : function() {
				this.$el.addClass(this.loadClass);
				Events.trigger('load:start');
				$.ajax({
					url: '/data/list.json',
					dataType: 'json',
					data: {
						page : this.page
					}
				})
				.done($.proxy(function(data) {
					var pages = data[0].pages;

					if (this.page >= pages || pages === 0) {
						this.$moreBtn.hide();
					}

					if(pages === 0) return false;

					this.add(data[1]);
				}, this))
				.fail($.proxy(function() {
					Events.trigger('error', 'Ajax Error');
				}, this))
				.always($.proxy(function() {
					Events.trigger('load:end');
					this.$el.removeClass(this.loadClass);
				}, this));		

				return this;		
			},

			add : function(data) {
				var item;

				for (var i = 0; i < data.length; i++) {
					console.log(data[i]);
				};				
			}
		});   

		return GalleryView;    
	}
);