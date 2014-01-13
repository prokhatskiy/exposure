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
    'models/Player',
    'views/PlayerView'
    ], function(Backbone, Player, PlayerView) {
        var app = {};
        app.player = new PlayerView();

        app.player.update({
            'src' : 'http://cs1-17v4.vk.me/p22/06db741176233c.mp3?extra=3Z08Te87UTtWAiW57mdlYR0f0gz7SEU1-V2pjBbsHHE2D25e-yMGo11wl4sFylUsOXKzm5qoH_2OFFT8ZIrV4q7sypotXGzO?/Flashguns - Panama.mp3',
            'trackTitle' : 'Intro',
            'singerTitle' : 'The XX'
        });
});