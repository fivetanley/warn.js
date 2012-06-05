// Grunt.js Build Configuration file

module.exports = function( grunt ){
	'use strict';

	grunt.loadTasks( './tasks' );

	grunt.initConfig({
		lint: {
			all: [ 'lint:lib', 'lint:test', 'lint:grunt' ],
			lib: [ 'lib/*.js' ],
			test: [ 'test/*.js' ],
			grunt: [ 'grunt.js', 'tasks/*.js' ]
		},

		jshint: {
			lib: {
				options: require( 'lints/lib.jshint.json' )
			},

			options: require( 'lints/lib.jshint' ),

			test: {
				options: require( 'lints/test.jshint' )
			}
		},

		test: {
			all: [ 'test/*.js' ]
		}
	});

	grunt.registerTask( 'build', 'lint test' );
		
};
