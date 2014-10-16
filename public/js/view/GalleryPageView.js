define(['view/PageView',
        'text!template/galleryPageTemplate.html'], function(PageView, galleryPageTemplate) {

    var GalleryPageView = PageView.extend({
        template : galleryPageTemplate
    });

    return GalleryPageView;
});