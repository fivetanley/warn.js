if ( typeof define !== 'function' ) {
	var define = require('amdefine')(module);
}

define(['Option'], function(Option) {

	var passfail, maxerr;

	passfail = new Option({
		name : 'passfail',
		description: 'If the scan should stop on first error',
		type : Boolean,
		defaultValue : false
	});

	maxerr = new Option({
		name : 'maxerr',
		description : 'Maximum errors before stopping',
		type : Boolean,
		defaultValue : false
	});

	return {
		'passfail' : passfail,
		'maxerr' : maxerr
	};

});
