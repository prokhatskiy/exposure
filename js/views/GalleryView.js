define(['underscore', 'backbone', 'Events', 'models/GalleryModel', 'text!templates/galleryTemplate.html', 'views/GalleryItemView'], 
	function(_, Backbone, Events, GalleryModel, galleryTemplate, GalleryItemView) {

		var GalleryView = Backbone.View.extend({
			tagName : 'section',
			className : 'gallery gallery_hide row',	
			showClass : 'gallery_show',
			hideClass : 'gallery_hide', 
			model : new GalleryModel(),
			_tpl : _.template(galleryTemplate),
			$DOMel : $('body'),
			page : 1,
			loadClass : 'gallery_load',
			items : [],


			initialize: function() {
				this.place();
				this.load();	
				this.show();		
			},

			events : {
				'click .gallery__more-btn' : 'load'
			},

			render : function() {				
				this.$el.html(this._tpl(this.model.toJSON()));
				this.$moreBtn = this.$el.find('.gallery__more-btn');
				return this;
			},

			place : function() {
				return this.$DOMel.append(this.render().$el);
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

			load : function() {
				this.$el.addClass(this.loadClass);
				Events.trigger('load:start');
				$.ajax({
					url: '/data/list/' + this.page + '.json',
					dataType: 'json',
					data: {
						page : this.page
					}
				})
				.done($.proxy(function(data) {					
					var pages = data.pages.length;

					if (this.page >= pages || pages === 0) {
						this.$moreBtn.hide();
					}
					if(pages === 0) return false;
					this.page++;					
					this.add(data.items);
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
				var item,
				    newItems = document.createDocumentFragment();
				for (var i = 0; i < data.length; i++) {
					item = new GalleryItemView({data : data[i]});
					this.items.push(item);
					newItems.appendChild(item.el)
				};	

				this.el.appendChild(newItems);
			}
		});   

		return GalleryView;    
	}
);