define(['underscore',
        'backbone',
        'jquery',
        'model/GalleryModel',
        'collection/GalleryCollection',
        'view/ItemView',
        'text!template/galleryTemplate'], function(_, Backbone, $, GalleryCollection, ItemView, galleryTemplate) {

    var GalleryView = Backbone.View.extend({
        el: document.getElementById('gallery'),
        template: _.template(galleryTemplate),
        model : new GalleryModel(),
        Collection : GalleryCollection,
        ItemView : ItemView,

        initialize : function() {
            this.collection = new this.Collection();
            this.collection.on('add', this.renderNewItems.bind(this));
            this.$el.on('click', '.gallery__more-link', this.collection.loadMore().bind(this.collection));

            return this;
        },

        render: function() {
            this.$el.append(this.template(this.model.toJSON()));

            return this;
        },

        renderNewItem: function(models) {
            var elems = document.createDocumentFragment();

            _.each(models, function(model) {
                var item = new ItemView({ model : model });
                elems.appendChild(item.el);
            });

            this.$el.append(elems);

            return this;
        },

        loadMore: function() {
            this.collection.loadMore();
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