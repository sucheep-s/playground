module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options : {
        force : true
      },
      main : ['dist', 'template', '.tmp/*', 'public/assets/js/app.js'],
    },

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
      main: {
        src: [ 'app/views/*.html' ],
        dest: 'template/template.js'
      }
    },
    concat: {
      /*options: {
        separator: ';'
      },*/
      app: {
        src: [
        'app/*.js',
        'app/services/*.js',
        'app/controllers/*.js',
        'app/directives/*.js',
        'template/*.js'
         ],
        dest: 'public/assets/js/app.js'
      }
    },
    useminPrepare: {
      html: 'view/index.html',
      options: {
        dest: 'view'
      }
    },
    usemin: {
      html:['view/index.html']
    },
    copy: {
      main: {
        src: 'app/index.html',
        dest: 'view/index.html'
      }
    },
    cssmin : {
      dist : {
        files : {
          'public/assets/css/main.css' : ['.tmp/concat/assets/css/main.css']
        }
      }
    },
    uglify : {
      dist:{
        files: {
           'public/assets/js/main.js': ['.tmp/concat/assets/js/main.js']
         },
        options: {
          mangle: false
        }
      }
    },
    watch: {
      files: ['app/*.js', 'app/**/*.js', 'app/views/*.html'],
      tasks: ['clean', 'copy', 'jshint', 'html2js', 'concat:app']
    },
    nodemon: {
      default: {
        script: 'server.js'
      }
    }

    // Task configuration will be written here
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  // Loading of tasks and registering tasks will be written here

  grunt.registerTask('dev', [ 'clean', 'copy', 'jshint', 'html2js', 'concat:app']);
  grunt.registerTask('build', [ 'clean', 'copy', 'jshint', 'html2js', 'concat:app', 'useminPrepare', 'concat:generated', 'cssmin:dist', 'uglify:dist', 'usemin']);

};
