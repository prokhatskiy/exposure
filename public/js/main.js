require.config({
    'baseUrl' : 'js',
    'paths' : {
        'jquery' : 'lib/jquery/jquery',
        'underscore' : 'lib/underscore/underscore',
        'backbone' : 'lib/backbone/backbone',
        'text': 'lib/requirejs-text/text'
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

require(['App'], function(App) {
    $.extend(window.app, new App());
    Backbone.history.start();
});