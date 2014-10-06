'use strict';

var APP_PORT = 3000;
var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        stylus: {
            compile: {
                files: {
                    'public/css/styles.css' : ['public/styl/styles.styl' ]
                },
                options: {
                    compress: false
                }
            }
        },
        watch: {
            stylus: {
                files: ['public/styl/**/*.styl'],
                tasks: ['stylus', 'autoprefixer:css'],
                options: {
                    spawn: false
                }
            },
            server : {
                files: ['bin/*', 'router/*.js', 'views/**', '*.js'],
                tasks: ['stopServer', 'startServer'],
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version', 'ie 10']
            },
            css: {
                expand: true,
                flatten: true,
                src: 'public/css/*.css',
                dest: 'public/css/'
            }
        },
        clean: {
            css: ['public/css/_*.css'],
        },
        express: {
            options: {
                port: APP_PORT,
                hostname: '*'
            },
            livereload: {
                options: {
                    server: path.resolve('./app.js'),
                    livereload: true,
                    serverreload: true,
                    bases: [path.resolve('./public')]
                }
            }
        },
        open : {
            dev : {
                path : 'http://localhost:' + APP_PORT
            }
        },
        copy : {
            lib : {
                files : [{
                    expand: true,
                    cwd : 'public/components/',
                    src: ['jquery/jquery.js',
                          'requirejs/require.js',
                          'underscore/underscore.js',
                          'backbone/backbone.js',
                          'requirejs-text/text.js'],
                    dest : 'public/js/lib/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('styles', ['open:dev', 'stylus', 'autoprefixer:css', 'watch:stylus']);
    grunt.registerTask('server', ['express']);

};