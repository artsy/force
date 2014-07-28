module.exports = function (grunt) {
    grunt.initConfig({

        jshint: {
            dist: {
                files: {
                    src: ['scrollpoints.js']
                },
            }
        },

        uglify: {
            my_target: {
                files: {
                    'scrollpoints.min.js': ['scrollpoints.js']
                }
            }
        },

        watch: {
            dist: {
                files: ['scrollpoints.js'],
                tasks: ['jshint', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'uglify', 'watch']);
}