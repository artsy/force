module.exports = function (grunt) {
  grunt.initConfig({
    release: {
      options: {
        commitMessage: 'Release <%= version %>'
      }
    }
  })

  grunt.loadNpmTasks('grunt-release')
}