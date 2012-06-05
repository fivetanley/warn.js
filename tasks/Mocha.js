module.exports = function( grunt ) {
	'use strict';

	var path = require( 'path' ),
		Mocha = require( 'mocha' ),
		should = require( 'should' );

	function resolveFilepaths( filepath ) {
		return path.resolve( filepath );
	}
	// optionally replace 'test' with 'mocha'.
	grunt.registerMultiTask( 'test', 'Run tests with Mocha', function() {
		var options = {},
			filepaths, paths, mocha_instance,
			testsPassed = true,
			runner,
			done = this.async();

		filepaths = grunt.file.expandFiles( this.file.src );
		grunt.file.clearRequireCache( filepaths );
		paths = filepaths.map( resolveFilepaths );

		options.growl = grunt.config.get( 'growl' ) ? true: false;

		mocha_instance = new Mocha( options );
		mocha_instance.reporter( 'spec' ).ui( 'bdd' );
		paths.map( mocha_instance.addFile.bind( mocha_instance ) );

		runner = mocha_instance.run();
		runner.on( 'fail', function( test ) {
			testsPassed = false;
		});
		runner.on( 'end', function() {
			done( testsPassed );
		});
	});
};
