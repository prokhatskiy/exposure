require.config({
    'baseUrl' : 'js',
    'paths' : {
        'jquery' : '../components/jquery/jquery.min',
        'underscore' : '../components/underscore/underscore-min',
        'backbone' : '../components/backbone/backbone-min',
        'text': '../components/requirejs-text/text',
        'imagesloaded' : '../components/imagesloaded/imagesloaded'
    },
    'shim' : {
        'jquery' : {
            'exports' : '$'
        },
        'underscore' : {
            'exports' : '_'
        },
        'backbone' : {
            'deps' : ['underscore', 'jquery'],
            'exports' : 'Backbone'
        }
    }
});

require([
    'backbone', 
    'Events',
    'views/MessageView',
    'views/GalleryView',
    'views/PageView',
    'routes/Router'
    ], function(Backbone, Events, MessageView, GalleryView, PageView, Router) {
        //Global vars
        var app = {
            $body : $('body'),
            $win : $('window'),
            messages : [],
            errors : [],
            pages : [],

            setState : function(state) {
                this.$body.addClass('state_' + state);
                return this;
            },

            removeState : function(state) {
                if(!state) {
                    this.$body.removeClass('state_' + state);
                }
                
                this.$body.removeClass('state_' + state);                
                return this;
            }
        };        

        // Global Events
        Events.on('load:start', function() {
            app.setState('load');
            console.log('[LOG] Load starting...');
        });
        Events.on('load:end', function() {
            app.removeState('load');
            console.log('[LOG] Load ended');
        });
        Events.on('error', function(text) {
            app.errors.push(new MessageView({
                text : text,
                type : 'error'
            }));
            console.log('[ERROR] ' + text);
        });
        Events.on('message', function(text) {
            app.errors.push(new MessageView({
                text : text,
                type : 'message'
            }));
            console.log('[MESSAGE] ' + text);
        });

        // Router events
        Events.on('gallery:open', function() {
            if(!app.gallery) {
                app.gallery = new GalleryView();
            }
            app.setState('gallery');       
        });
        Events.on('page:open', function(id) {
            if(app.pages[id] !== undefined) {
                app.pages[id].show();
            }
            else {
                app.pages[id] = new PageView({
                    url : id
                });
            }
            app.setState('page');
        });

        //Run!
        app.router = new Router();
        Backbone.history.start();

        return app;
});