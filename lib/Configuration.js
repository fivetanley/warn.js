if ( typeof define !== 'function' ) {
	var define = require('amdefine')(module);
}

define( [ 'options/index', 'Option', 'CustomPredefs', 'Predef' ], function( options, Option, predefs, Predef) {

	function Configuration( configOpts ) {
		
		var iterator,
			key,
			defaultValues = this.defaultValues,
			defaultValuesKeys = Object.keys( this.defaultValues ),
			defaultValue;


		// Set the value of `this`.key to the passed value or
		// the default value if a value is not passed through configOpts
		for ( iterator in defaultValuesKeys ) {
			key = defaultValuesKeys[ iterator ];
			defaultValue = defaultValues[ key ];
			this[ key ] = new Option( defaultValue );
			// If configOpts.key is defined, try to set it.
			if ( configOpts !== undefined && configOpts[ key ] !== undefined) {
				this[ key ].setValue( configOpts[ key ] );
			}
		}

	}

	// Default values loaded from options/index
	Configuration.prototype.defaultValues = ( function() {
		var values = { },
			iterator,
			subPropertyIterator,
			keyName,
			masterKeys,
			subKeyName,
			subKeys;

		masterKeys = Object.keys( options) ;

		// defaultValues.name should have the value of options.category.name
		for ( iterator in masterKeys ) {
			keyName = masterKeys[ iterator ];
			subKeys = Object.keys( options[ keyName ] );
			for (subPropertyIterator in subKeys ){
				subKeyName = subKeys[ subPropertyIterator ];
				// Assign the object to values.
				values[ subKeyName ] = options[ keyName ][ subKeyName ];
			}
		}

		return values;
	}());

	// Set a configuration option to a value.
	Configuration.prototype.set = function( optionName, value ) {

		// check to see if property exists; we don't want to output
		// configuration options that aren't supported
		if ( this[ optionName ] === undefined ) {
			throw new Error( 'Unsupported JSHint operation' );
		}

		// Otherwise, use setValue on the Option to set the value.
		this[ optionName ].setValue( value );

		return value;
	};

	// Predefined globals list.
	Configuration.prototype.predefs = (function() {
		var predefinedGlobals = Object.keys( predefs ),
			iterator,
			key,
			predefsCollection = {};

		for ( iterator in predefinedGlobals ) {
			key = predefinedGlobals[ iterator ];
			predefsCollection[ key ] = new Predef( predefs[ key ] );
		}

		return predefsCollection;
	} () );


	// Enable a predefined global, either a JSHint predefined one like jquery or dojo,
	// or a customPredefs defined by Warn or passed in.
	Configuration.prototype.addPredef = function( name, dict ){

		var predefinedGlobals = Object.keys( options.predefinedGlobals ),
			customPredefs,
			index,
			customPredef;

		if ( predefinedGlobals.indexOf( name ) !== -1 && name !== 'predef' ) {
			this[ name ].setValue( true );
			return;
		}
y
		customPredefs = Object.keys( Configuration.prototype.predefs );
		index = customPredefs.indexOf( name );

		if ( index !== -1 ) {
			customPredef = customPredefs[ index ];
			if ( customPredef instanceof Array ) {
				continue;	
			}
		}
	};

	return Configuration;

});
