define([], function() {
    var GalleryItemView = Backbone.View.extend({
        tagName : 'article',
        className : 'gallery__item',
        template : _.template(galleryItemTemplate),

        initialize : function() {
            this.render();
        },

        render : function() {
            this.template(this.model.toJSON);
        }
    });

    return GalleryItemView;
});