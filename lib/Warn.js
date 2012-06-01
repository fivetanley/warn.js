if ( typeof define !== 'function' ) {
	var define = require( 'amdefine' )( module );
}

define([ 'commander', 'Configuration' ], function( program, Configuration ) {
	'use strict';
	
	var config = new Configuration();

	// set up commander.js
	program.version('0.0.1')
		.option('-l', '--load <file>', 'Load a JSHint json configuration file')
		.option('-o', '--output <file>', 'Specify the output file to save new configuration file')
		.option('-e', '--enable <list>', 'Enable options or predefined globals ( like browser, node, jquery, backbone)')
		.option('-d', '--disable <list>', 'Disable options or predefined globals ( like browser, node, jquery, backbone)')
		.parse(process.argv);

	function list( val ) {
		return val.split( ',' );
	}

	if ( program.load ) {

	

	
});
