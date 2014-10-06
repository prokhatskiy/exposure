define(['jquery',
        'underscore',
        'backbone',
        'text!template/galleryItemTemplate.html'], function($, _, Backbone, galleryItemTemplate) {

    var GalleryItemView = Backbone.View.extend({
        tagName : 'article',
        className : 'gallery__item',
        template : _.template(galleryItemTemplate),

        initialize : function() {
            this.render();
        },

        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this.el;
        }
    });

    return GalleryItemView;
});