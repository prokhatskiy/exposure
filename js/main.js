require.config({
    'baseUrl' : 'js',
    'paths' : {
        'jquery' : '../components/jquery/jquery.min',
        'underscore' : '../components/underscore/underscore-min',
        'backbone' : '../components/backbone/backbone-min',
        'text': '../components/requirejs-text/text',
        'imagesloaded' : '../components/imagesloaded/imagesloaded.pkgd.min'
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
    'views/AboutView',
    'routes/Router'
    ], function(Backbone, Events, MessageView, GalleryView, PageView, AboutView, Router) {
        //Global vars
        var app = {
            $body : $('body'),
            $win : $('window'),
            messages : [],
            errors : [],
            pages : [],
            modules : [],

            setState : function(state) {
                this.$body.addClass('state_' + state);
                return this;
            },

            removeState : function(state) {
                if(!state || state === 'all') {
                    //hardcoding is bad!
                    this.$body.removeClass('state_gallery state_page state_about'); 
                    return this;
                }                
                this.$body.removeClass('state_' + state);                
                return this;
            },

            beforeInit : function() {
                this.bindEvents();
            },

            afterInit : function() {
                this.initModules();
            },

            initModules : function() {
                $('[data-module]').each(function() {
                    var $el = $(this);

                    if($el.data('isActive')) {
                        return false;
                    }

                    require(['modules/' + $el.attr('data-module')], function(Module) {
                        app.modules.push(new Module($el));
                        $el.data('isActive', true);
                    });
                });
                return this;
            },

            bindEvents : function() {
                // Global Events
                Events.on('load:start', function() {
                    app.setState('load');
                    console.log('[LOG] Load start...');
                });

                Events.on('load:end', function() {
                    setTimeout(function () {
                        app.removeState('load');
                        app.initModules();
                        console.log('[LOG] Load end');
                    }, 3000);
                    
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
                    app.removeState();
                    app.setState('gallery');  
                    if(!app.gallery) {
                        app.gallery = new GalleryView();
                    }                
                });

                Events.on('page:open', function(id) {
                    app.removeState();
                    app.setState('page');
                    if(app.pages[id] !== undefined) {
                        app.pages[id].show();
                    }
                    else {
                        app.pages[id] = new PageView({
                            url : id
                        });
                    }            
                });

                Events.on('about:open', function(id) {
                    app.removeState();
                    app.setState('about');  
                    if(!app.about) {
                        app.about = new AboutView();
                    }             
                });
            },

            initialize : function() {
                this.beforeInit();               

                //Run!
                app.router = new Router();
                Backbone.history.start();

                this.afterInit();
            }
        };    

        app.initialize();           

        return app;
});