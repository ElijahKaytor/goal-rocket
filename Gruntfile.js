/*! File: Gruntfile.js
 *  Author: Elijah Kaytor
 */

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    grunt.initConfig({
        watch: {
            options: { spawn: false, },
            
            scripts: {
                files: ['www/static/js/src/*.js'],
                tasks: ['uglify'],
            },
            
            styles: {
                files: ['www/static/sass/**/*.sass'],
                tasks: ['sass'],
            },
        },
        
        sass: {
            options: {
                compass: true,
                sourcemap: true,
                style: 'compressed',
            },
            
            index: {
                files: [{
                    expand: true,
                    cwd: 'www/static/sass',
                    src: ['*.sass'],
                    dest: 'www/static/sass',
                    ext: '.sass.css',
                }],
            }
        },
        
        uglify: {
            options: {
                mangle: true,
                compress: true,
                sourceMapPrefix: 3,
                report: 'min',
            },
            
            'onload.min.js': {
                options: {
                    sourceMap: 'www/static/js/onload.min.map',
                    sourceMappingURL: 'onload.min.map',
                    banner: '/* File: onload.min.js | Includes: jQuery Core */'
                },
                
                files: {
                    'www/static/js/onload.min.js': [
                        'www/static/js/src/jquery-core-2.1.0pre.js',
                        'www/static/js/src/index.js',
                    ],
                }
            },
            
            'inline-loader.min.js': {
                options: {
                    sourceMap: 'www/static/js/inline-loader.min.map',
                    sourceMappingURL: '/static/js/inline-loader.min.map',
                    banner: '/* File: inline-loader.min.js */'
                },
                
                files: {
                    'www/static/js/inline-loader.min.js': [
                        'www/static/js/src/inline-loader.js',
                    ],
                },
            },
            
            'deferred.min.js': {
                options: {
                    sourceMap: 'www/static/js/deferred.min.map',
                    sourceMappingURL: 'deferred.min.map',
                    banner: '/* File: deferred.min.js */'
                },
                
                files: {
                    'www/static/js/deferred.min.js': [
                        'www/static/js/src/email-helper.js',
                        'www/static/js/src/analytics.js',
                    ],
                },
            },
        }
    });
    
    grunt.registerTask('compile-all', ['sass', 'uglify']);
    grunt.registerTask('default', 'compile-all');
};

