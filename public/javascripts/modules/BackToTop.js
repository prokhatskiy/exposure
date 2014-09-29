define(['jquery'], function($) {

	var DEFAULTS = {
		DELAY : 1000,
		THROTTLE_DELAY : 500,
		LIMIT : 400
	}


	var BackToTop = function($el) {
		var _this = (this instanceof BackToTop) ? 
                    this : 
                    Object.create(BackToTop.prototype);
                    
		_this.$el = $el;
		_this.$win = $(window);

		_this.initialize();

		return this;
	};

	$.extend(BackToTop.prototype, {
		initialize : function initialize() {
			this.$el.hide();
			this.bindEvents();
			return this;
		},

		bindEvents : function bindEvents() {
			this.$el.on('click', $.proxy(this.scrollToTop, this));
			this.$win.on('scroll', _.throttle($.proxy(this.checkWinPosition, this), DEFAULTS.THROTTLE_DELAY));

			return this;
		},

		scrollToTop : function scrollToTop() {
			$('html, body').animate({
				scrollTop : 0
			}, DEFAULTS.DELAY);

			return this;
		},

		checkWinPosition : function checkWinPosition() {
			var position = this.$win.scrollTop();
			
			if(position > DEFAULTS.LIMIT) {
				this.$el.show();
			}
			else {
				this.$el.hide();
			}

			return this;
		}
	});

	return BackToTop;    
});