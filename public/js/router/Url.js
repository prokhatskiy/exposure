define([], function() {
    var URL = {
        gallery : function(page) {
            if(window.app.useDb) {
                return '/services/gallery/' + page;
            }
            else {
                return '/services/gallery/gallery-' + page + '.json'
            }
        }
    };

    return URL;
});