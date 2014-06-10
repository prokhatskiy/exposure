define([
    'jquery',
    'underscore',
    'backbone', 
    'constants',
    'Events',
    'views/MessageView',
    'views/GalleryView',
    'views/PageView',
    'views/AboutView',
    'routes/Router'
    ], function($, _, Backbone, CONST, Events, MessageView, GalleryView, PageView, AboutView, Router) {
        //Global vars

        var App = function() {
            var _this = (this instanceof App) ? 
                        this : 
                        Object.create(_this.prototype);

            _this.initialize();

            return this;
        };

        $.extend(App.prototype, {
            state : undefined,
            $body : $('body'),
            $win : $('window'),
            messages : [],
            errors : [],
            pages : {},
            modules : [],

            initialize : function() {
                this.bindEvents();          
                //Run!
                this.router = new Router();
                Backbone.history.start();
            },

            setState : function(state) {
                this.state = state;
                this.$body.addClass('state_' + this.state);
                return this;
            },

            removeState : function(state) {
                if(!state || state === 'all') {
                    //hardcoding is bad!
                    this.$body.removeClass(CONST.STATES); 
                    return this;
                }                
                this.$body.removeClass('state_' + state);                
                return this;
            },

            initModules : function(callback) {
                var _this = this;

                $('[data-module]').each(function() {
                    var $el = $(this);

                    if($el.data('isActive')) {
                        return false;
                    }

                    require(['modules/' + $el.attr('data-module')], function(Module) {
                        _this.modules.push(new Module($el));
                        $el.data('isActive', true);
                    });
                });

                if(typeof callback === 'function') callback();

                return this;
            },

            bindEvents : function() {
                var _this = this;

                // Global Events
                Events.on(CONST.EVENTS.LOAD_START, function() {
                    _this.setState('load');
                });

                Events.on(CONST.EVENTS.LOAD_END, function() {
                    _this.initModules(function() {
                        _this.removeState('load');   
                    });                     
                });

                Events.on(CONST.EVENTS.ERROR, function(text) {
                    _this.errors.push(new MessageView({
                        text : text,
                        type : 'error'
                    }));
                });

                Events.on(CONST.EVENTS.MESSAGE, function(text) {
                    _this.errors.push(new MessageView({
                        text : text,
                        type : 'message'
                    }));
                });

                // Router events
                Events.on(CONST.EVENTS.GALLERY_OPEN, function() {
                    Events.trigger('page:hide');
                    _this.setState('gallery');  

                    if(!_this.gallery) {
                        _this.gallery = new GalleryView();
                    } 

                    if(_this.galleryScroll > 0) {
                        _this.$win.scrollTop(_this.galleryScroll);
                    }               
                });

                Events.on(CONST.EVENTS.GALLER_CLOSE, function() {
                    _this.galleryScroll = _this.$win.scrollTop();
                });

                Events.on(CONST.EVENTS.PAGE_OPEN, function(id) {
                    _this.setState('page');
                    Events.trigger('page:hide');

                    if(_this.pages[id] !== undefined) {
                        _this.pages[id].show();
                    }
                    else {
                        _this.pages[id] = new PageView({
                            url : id
                        });
                    }            
                });

                Events.on(CONST.EVENTS.PAGE_CLOSE, function() {
                    _.each(_this.pages, function(page) {
                        page.hide();
                    });
                });

                Events.on(CONST.EVENTS.ABOUT_OPEN, function(id) {
                    Events.trigger('page:close');
                    _this.removeState();
                    _this.setState('about');  
                    if(!_this.about) {
                        _this.about = new AboutView();
                    }    
                    else {
                        _this.about.show();
                    }         
                });

                Events.on(CONST.EVENTS.ABOUT_CLOSE, function(id) {
                            
                });
            }
        });
        
        return App;
});