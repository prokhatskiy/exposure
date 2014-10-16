define(['backbone',
        'underscore',
        'jquery',
        'router/Router',
        'Events',
        'constants',
        'view/GalleryView',
        'view/GalleryPageView',
        'model/GalleryPageModel'], function(Backbone, _, $, Router, Events, CONST, GalleryView, GalleryPageView, GalleryPageModel) {

    function App() {
        this.$body = $(document.body);
        this.$win = $(window);

        this.support = {
            touch : !!('ontouchstart' in window),
            localStorage : (function() {
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch(e){
                    return false;
                }
            }())
        };

        //check relevance of cached content
        if(this.support.localStorage) {
            if(localStorage.getItem('cacheDate') < window.lastContentUpdateDate) {
                localStorage.clear();
            }
        }

        this.initialize();
        this.bindEvents();

        return this;
    }


    App.prototype.initialize = function initialize() {
        if(this.support.localStorage) {
            if(window.lastUpdateTime && localStorage.getItem('cacheTime')) {
                if (window.lastUpdateTime > localStorage.getItem('cacheTime')) {
                    localStorage.clear();
                }
            }
        }

        this.router = new Router();
    };

    App.prototype.bindEvents = function bindEvents() {
        Events.on('load:start', function() {
            this.$body.addClass(CONST.SELECTORS.LOAD_CLS);
        }.bind(this));

        Events.on('load:end', function() {
            this.$body.removeClass(CONST.SELECTORS.LOAD_CLS);
        }.bind(this));

        Events.on('gallery:show', function() {
            Events.trigger('page:close');
            if(this['gallery'] === undefined) {
                this.gallery = new GalleryView();
            }
            else {
                this.gallery.show();
            }
        }.bind(this));

        Events.on('gallery:hide', function() {
            if(this['gallery'] !== undefined) {
                this.gallery.hide();
            }
        }.bind(this));

        Events.on('page:open', function(pageType, id) {
            if(pageType === 'galleryPage') {
                var model = new GalleryPageModel({
                    id : id
                });

                this.page = new GalleryPageView({
                    model : model
                });
            }
        }.bind(this));

        Events.on('page:close', function() {
            if(this['page'] !== undefined) {
                this.page.remove();
                delete this.page;
            }
        }.bind(this));
    };

    return App;
});