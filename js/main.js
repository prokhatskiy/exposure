require.config({
    'baseUrl' : 'js',
    'paths' : {
        'jquery' : '../components/jquery/jquery.min',
        'underscore' : '../components/underscore/underscore-min',
        'backbone' : '../components/backbone/backbone-min',
        'text': '../components/requirejs-text/text'
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
    'views/GalleryView'    
    ], function(Backbone, Events, MessageView, GalleryView) {
        //Global vars
        var app = {
            $body : $('body'),
            $win : $('window'),
            loadClass : 'state__load',
            messages : [],
            errors : []
        };        

        // Global Events
        Events.on('load:start', function() {
            app.$body.addClass(app.loadClass);
            console.log('[LOG] Load starting...');
        });
        Events.on('load:end', function() {
            app.$body.removeClass(app.loadClass);
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

        //Run!
        app.gallery = new GalleryView();

        return app;
});