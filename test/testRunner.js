(function() {
	'use strict';

	var rjs = require('requirejs'),
		fs = require('fs'),
		mochaTests = [];

	rjs = rjs.config({
		baseUrl: __dirname + '/../lib',
		nodeRequire: require
	});

	// Read `mocha` directory for tests.
	mochaTests = fs.readdirSync( __dirname + '/mocha' );
	mochaTests.forEach( function( test , index ) {
		mochaTests[index] = __dirname + '/mocha/' + test;
	});

	// run all mocha tests.
	rjs ( mochaTests , function() {
		// Tests are run using the command line runner e.g.
	 	// mocha -r should -R spec from the project directory
	});

}());
