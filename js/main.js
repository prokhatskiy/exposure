require.config({
    'baseUrl' : 'js',
    'paths' : {
        'jquery' : '../components/jquery/jquery.min',
        'underscore' : '../components/underscore/underscore-min',
        'backbone' : '../components/backbone/backbone-min',
        'text': '../components/requirejs-text/text',
        'imagesloaded' : '../components/imagesloaded/imagesloaded.pkgd.min',
        'isotope' : '../components/isotope/dist/isotope.pkgd.min'
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
});