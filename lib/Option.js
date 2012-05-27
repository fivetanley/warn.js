if (typeof define !== 'function'){
	var define = require('amdefine')(module);
}

define(function(){

	// Option constructor
	// options should be an object
	function Option(options){
		if ( typeof options !== 'object' ) {
			throw new Error('options should be an object');
		}

		if ( !options.name || !options.description || !options.type || options.defaultValue === undefined ) {
			throw new Error('name,description, type, and defaultValue required');
		}

		// Set name of option
		this.name = options.name;

		// A description of the setting.
		this.description = options.description;

		// The type of value `this` option can have.
		this.type = options.type;

		this.defaultValue = options.defaultValue;

		this.value = this.defaultValue;
	}

	// Set the value of `this` option.  Must match type.
	Option.prototype.setValue = function(val) {
		// Convert to object if boolean or number
		if ( typeof val === 'boolean' ) {
			val = new Boolean(val);
		} else if ( typeof val === 'number' ) {
			val = new Number(val);
		}

		// Make sure value type matches `this.type`
		if ( !(val instanceof this.type) ) {
			throw new Error('Value type must match option type');
		}

		this.value = val;
	};


	return Option;
});
