if ( typeof define !== 'function' ) {
	var define = require('amdefine')(module);
}

define( ['Option'], function(Option){

	return {
		
		asi: new Option({
			name: 'asi',
			description: 'If automatic semicolon insertion should be tolerated',
			type: Boolean,
			defaultValue: false
		}),

		laxbreak: new Option({
			name: 'laxbreak',
			description: 'If line breaks should not be checked, e.g. `return [\n] x`',
			type: Boolean,
			defaultValue: false
		}),


	};	

});
