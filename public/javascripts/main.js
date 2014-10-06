require.config({
    'baseUrl' : 'javascripts',
    'paths' : {
        'jquery' : '../components/jquery/jquery.min',
        'underscore' : '../components/underscore/underscore-min',
        'backbone' : '../components/backbone/backbone',
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

require(['App'], function(App) {
    window.app = new App();
    Backbone.history.start();
});