define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var MessageView;
	
	return MessageView = Backbone.View.extend({
		tagName : 'div',
		className : 'message',	
		$DOMel : $('body'),
		errorClass : 'message_error',
		delay : 5000,

		initialize: function() {
			this.options.text = this.options.text || '';
			this.render();
			this.$el.on('click', $.proxy(this.remove, this));
		},

		render : function() {	
			this.$el.html(this.options.text);
			if(this.options.type === 'error') {
				this.$el.addClass(this.errorClass);
			}
			this.$DOMel.append(this.$el);
			setTimeout($.proxy(this.remove, this), this.delay);
		},

		remove : function() {
			this.$el.remove();
		}
	});   
});