module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.initConfig({
        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: 'min',
            },
            
            'onload.min.js': {
                options: {
                    sourceMapPrefix: 3,
                    sourceMap: 'www/static/js/onload.min.map',
                    sourceMappingURL: 'onload.min.map',
                },
                
                files: {
                    'www/static/js/onload.min.js': [
                        'www/static/js/src/jquery-1.10.2.js',
                        'www/static/js/src/index.js',
                    ],
                }
            },
            
            'deffered.min.js': {
                options: {
                    sourceMapPrefix: 3,
                    sourceMap: 'www/static/js/deffered.min.map',
                    sourceMappingURL: 'deffered.min.map',
                },
                
                files: {
                    'www/static/js/deffered.min.js': [
                        'www/static/js/src/firebase-v0.min.js',
                        'www/static/js/src/analytics.js',
                        'www/static/js/src/sha-256.js',
                    ],
                },
            },
        }
    });
    
    grunt.registerTask('compress', 'uglify');
};

