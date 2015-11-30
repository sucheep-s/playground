module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["dist", 'tmp', 'public/assets/js/bundle.js'],

    jshint: {
      all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js', '!app/directives/uiCalendarDirective.js' ]
    },

    html2js: {
      options: {
        base: 'app',
        module: 'myApp.templates',
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      dist: {
        src: [ 'app/views/*.html' ],
        dest: 'tmp/templates.js'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
        'app/*.js',
        'app/services/*.js',
        'app/controllers/*.js',
        'app/directives/*.js',
        'tmp/*.js'
         ],
        dest: 'dist/bundle.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'public/bundle.js': [ 'dist/bundle.js' ]
        },
        options: {
          mangle: false
        }
      }
    },
    useminPrepare: {
      src: 'view/index.html'
    }
    // Task configuration will be written here
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  // Loading of tasks and registering tasks will be written here
  grunt.registerTask('default', [ 'clean', 'jshint', 'html2js:dist', 'concat:dist', 'uglify:dist']);
  grunt.registerTask('build', [ 'useminPrepare']);

};
