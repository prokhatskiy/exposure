define(['backbone', 'underscore', 'jquery', 'router/Router', 'Events', 'constants'], function(Backbone, _, $, Router, Events, CONST) {
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
        this.router = new Router();
        Backbone.history.start();
    };

    App.prototype.bindEvents = function bindEvents() {
        Events.on('load:start', function() {
            this.$body.addClass(CONST.loadClass);
        }.bind(this));

        Events.on('load:end', function() {
            this.$body.removeClass(CONST.loadClass);
        }.bind(this));
    };

    return App;
});