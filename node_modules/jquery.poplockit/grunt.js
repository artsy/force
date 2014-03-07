/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:poplockit.jquery.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jasmine : {
            src : ['lib/jquery.js', 'src/**/*.js'],
            specs : 'spec/**/*_spec.js',
            helpers : ['dist/<%= pkg.name %>.js', 'spec/helpers/*.js']
        },
        coffee: {
            dist: {
                src: ['src/**/*.coffee'],
                options: {
                    bare: false,
                    preserve_dirs: true
                }
            },
            example: {
                src: ['example/js/**/*.coffee'],
                options: {
                    bare: false,
                    preserve_dirs: true
                }
            },
            spec: {
                src: ['spec/**/*.coffee'],
                options: {
                    bare: false,
                    preserve_dirs: true
                }
            }
        },
        watch: {
            files: ['src/**/*.coffee', 'spec/**/*.coffee', 'example/**/*.coffee'],
            tasks: ['coffee']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true
            }
        },
        uglify: {}
    });

    grunt.loadNpmTasks('grunt-jasmine-runner');
    grunt.loadNpmTasks('grunt-coffee');

    // Default task.
    grunt.registerTask('default', 'coffee concat min jasmine');

    // Travis CI task.
    grunt.registerTask('travis', 'jasmine');
};
