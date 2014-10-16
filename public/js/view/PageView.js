define(['jquery',
    'underscore',
    'backbone',
    'helper'], function($, _, Backbone, helper) {

    var DEFAULTS = {
        PLACEHOLDER_ID : 'pagePlaceholder'
    };

    var PageView = Backbone.View.extend({
        domEl : document.getElementById(DEFAULTS.PLACEHOLDER_ID),

        initialize : function() {
            this.template =  _.template(this.template);
            this.model.on('change', this.render.bind(this));
            this.model.update();

            return this;
        },

        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.domEl.appendChild(this.el);
            this.initModules();
            return this.el;
        },

        initModules : function() {
            helper.initModules(this.$el);
            return this.el;
        }
    });

    return PageView;
});