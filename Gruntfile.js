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
				start_comment: "test-code",
				end_comment: "end-test-code",
			},
			build: {
				src: 'build/*.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-strip-code');
	grunt.registerTask(
	'build',
		'Copies all source files to build directory, and removes test code',
		[ 'clean', 'copy', 'strip_code']
	);
};