/*! File: Gruntfile.js
 *  Author: Elijah Kaytor
 */

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.initConfig({
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
            
            'deffered.min.js': {
                options: {
                    sourceMap: 'www/static/js/deffered.min.map',
                    sourceMappingURL: 'deffered.min.map',
                    banner: '/* File: deffered.min.js */'
                },
                
                files: {
                    'www/static/js/deffered.min.js': [
                        'www/static/js/src/email-helper.js',
                        'www/static/js/src/analytics.js',
                    ],
                },
            },
        }
    });
    
    grunt.registerTask('compress', 'uglify');
};

