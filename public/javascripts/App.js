define(['backbone',
        'underscore',
        'jquery',
        'router/Router',
        'Events',
        'constants',
        'view/GalleryView'], function(Backbone, _, $, Router, Events, CONST, GalleryView) {
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
            this.$body.addClass(CONST.loadClass);
        }.bind(this));

        Events.on('load:end', function() {
            this.$body.removeClass(CONST.loadClass);
        }.bind(this));

        Events.on('gallery', function() {
            if(this['gallery'] === undefined) {
                this.gallery = new GalleryView();
            }
            else {
                this.gallery.show();
            }
        }.bind(this));
    };

    return App;
});