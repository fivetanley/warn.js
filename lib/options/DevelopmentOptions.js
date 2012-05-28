if ( typeof define !== 'function' ) {
	var define = require('amdefine')(module);
}

define( [ 'Option' ], function(Option) {

	return {
		debug : new Option({
			name: 'debug',
			description: 'If debugger statements should be allowed.',
			type: Boolean,
			defaultValue: false
		}),

		devel: new Option({
			name: 'devel',
			description: 'If logging globals should be predefined (console,alert, etc.)',
			type: Boolean,
			defaultValue: false
		})
	};

});
