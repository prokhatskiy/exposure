define([], function() {
    var URL = {
        useDB : window.app.useDb || true,
        gallery : function(page) {
            if(window.app.useDb) {
                return '/services/gallery/' + page;
            }
            else {
                return '/services/gallery/gallery-' + page + '.json'
            }
        },
        galleryPage : function(id) {
            if(window.app.useDb) {
                return '/services/page/' + id;
            }
            else {
                return '/services/pages/page-' + id + '.json'
            }
        }
    };

    return URL;
});