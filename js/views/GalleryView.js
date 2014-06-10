define([
	'jquery',
	'underscore', 
	'backbone', 
	'constants',
	'imagesloaded',
	'isotope', 
	'Events', 
	'collections/GalleryCollection', 
	'views/GalleryItemView',
	'models/GalleryModel',
	'text!templates/galleryTemplate.html'
	], function($, _, Backbone, CONST, imagesLoaded, Isotope, Events, GalleryCollection, GalleryItemView, GalleryModel, galleryTemplate) {

		var DEFAULTS = {
			PATH : '/data/list/',
			ITEM_CLS : 'gallery__item',
			MORE_BTN_CLS : '.gallery__more-btn'
		}

		var GalleryView = Backbone.View.extend({
			tagName : 'section',
			className : 'gallery',
			model : new GalleryModel(),
			collection : new GalleryCollection(),	
			_tpl : _.template(galleryTemplate),
			$DOMel : $('#content'),
			page : 1,
			items : [],
			isotope : false,
			isFull : false,

			initialize: function() {				
				this.render();
				this.bindEvents();
				this.getData();			
			},

			bindEvents : function() {
				this.$el.on('click', DEFAULTS.MORE_BTN_CLS, $.proxy(this.getData, this));
				this.collection.on('add', $.proxy(this.addItems, this));
			},

			render : function() {				
				this.$el.html(this._tpl(this.model));
				this.$DOMel.append(this.$el);

				return this;
			},

			getData : function() {
				if(this.isFull) return false;

				this.$el.addClass(DEFAULTS.LOAD_CLS);
				Events.trigger(CONST.EVENTS.LOAD_START);

				$.ajax({
					url: DEFAULTS.PATH + this.page + '.json',
					dataType: 'json',
					data: {
						page : this.page
					}
				})
				.done($.proxy(function(data) {	
					this.page++;
					Events.trigger(CONST.EVENTS.LOAD_END);
					Events.trigger(CONST.EVENTS.LOADED_GALLERY_ITEMS, data);

					if(data.pages.current === data.pages.length-1) {
						this.$el.find(DEFAULTS.MORE_BTN_CLS).hide();
						this.isFull = true;
					}
				}, this))
				.fail($.proxy(function() {
					Events.trigger(CONST.EVENTS.LOAD_END);
					Events.trigger(CONST.EVENTS.ERROR, 'Ajax Error');
				}, this));	

				return this;		
			},

			addItems : function() {
				var items = this.collection.where({ 'isRendered' : false }),
				    newItems = document.createDocumentFragment();

				_.each(items, function(model) {
					newItems.appendChild(new GalleryItemView(model).el);
				});

				this.$el.append(newItems);
				this.buildLayout(newItems);
			},

			buildLayout : function(newItems) {
				imagesLoaded(this.$el.find('img'), $.proxy(function() {					
					if(this.masonry) {
						this.isotope.appended(newItems);
					}
					else {
						this.isotope = new Isotope(this.$el[0], {
							itemSelector : '.' + DEFAULTS.ITEM_CLS
						});
					}					
				}, this));
			}
		});   

		return GalleryView;    
	}
);