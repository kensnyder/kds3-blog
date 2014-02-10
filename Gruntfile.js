'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		uglify: {
			dist: {
				src: './app/assets/js/**/*.js',
				dest: './app/assets/build/scripts.min.js'
			}
		},
		cssmin: {
			options: {
				report: 'gzip'
			},
			compress: {
				files: {
					'./app/assets/build/styles.min.css': [
						'./app/assets/css/**/*.css'
					]
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task
	grunt.registerTask('build', ['cssmin', 'uglify']);
	grunt.registerTask('default', ['build']);

};
