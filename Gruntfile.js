module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: {
        src: 'build'
      }
    },
    copy: {
      build: {
        cwd: 'src',
        src: [ '**' ],
        dest: 'build',
        expand: true
      }
    },
    strip_code: {
      options: {
        start_comment: 'test-code',
        end_comment: 'end-test-code',
      },
      build: {
        src: 'build/*.js'
      }
    },
    uglify: {
      build: {
        files: {
          'build/color-grid.js': ['build/color-grid.js']
        }
      }
    },
    jshint: {
      src: ['src/*.js'],
      grunt: ['Gruntfile.js'],
      test: ['test/color-grid-test.js'],
      options: {
        browser: true,
        curly: true,
        eqeqeq: true
      }
    },
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-strip-code');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.registerTask(
  'build',
    'Copies all source files to build directory, and removes test code',
    [ 'clean', 'copy', 'strip_code', 'uglify' ]
  );
};
