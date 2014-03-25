/*global module:false*/
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    simplemocha: {
      options: {
        timeout: 3000,
        ignoreLeaks: false,
        reporter: 'tap'
      },

      all: { src: ['tests/**/*.js'] }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: false,
        eqnull: false,
        "-W041": false, // ignores ==
        expr: false,
        globals: {
          module: true,
          console: true,
          require: true,
          it: true,
          setTimeout: true,
          describe: true
        }
      },
      files: ['Gruntfile.js', 'tests/**/*.js', 'noob_pact.js']
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      my_target: {
        files: {
          'noob_pact.min.js': ['noob_pact.js']
        }
      }
    },
  });


  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['simplemocha', 'jshint']);
};
