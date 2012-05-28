if ( typeof define !== 'function' ) {
	var define = require('amdefine')(module);
}

define( [ 'Option' ], function(Option){

	return {
		es5: new Option({
			name: 'es5',
			description: 'If ES5 syntax should be allowed',
			type: Boolean,
			defaultValue: false
		}),

		strict: new Option({
			name: 'strict',
			description: "Require the 'use strict' pragma",
			type: Boolean,
			defaultValue: false
		}),

		globalstrict: new Option({
			name: 'globalstrict',
			description: 'If global use strict should be allowed (also enables strict)',
			type: Boolean,
			defaultValue: false
		})
	};
});
