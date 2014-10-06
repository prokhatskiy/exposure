define(['underscore',
        'backbone',
        'jquery',
        'Events',
        'collection/GalleryCollection',
        'view/GalleryItemView',
        'text!template/galleryTemplate.html'], function(_, Backbone, $, Events, GalleryCollection, ItemView, galleryTemplate) {

    var GalleryView = Backbone.View.extend({
        el: document.getElementById('gallery'),
        template: _.template(galleryTemplate),
        collection : new GalleryCollection(),
        ItemView : ItemView,

        initialize : function() {
            this.render();
            this.collection.on('add', this.renderNewItems.bind(this));
            this.$el.on('click', '.gallery__more-btn', this.update.bind(this.collection));

            this.update();

            return this;
        },

        render: function() {
            this.$el.append(this.template({}));
            return this;
        },

        renderNewItems: function(model) {
            var item = new ItemView({ model : model });

            this.$el.append(item.$el);

            return this;
        },

        update: function() {
            Events.trigger('gallery:update');
        },

        hide : function() {
            this.$el.hide();
        },

        show : function() {
            this.$el.show();
        }
    });

    return GalleryView;
});