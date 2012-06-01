if ( typeof define !== 'function' ) {
	var define = require( 'amdefine ')( module );
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
			subKeys,
			optionName;

		masterKeys = Object.keys( options) ;

		// defaultValues.name should have the value of options.category.name
		for ( iterator in masterKeys ) {
			keyName = masterKeys[ iterator ];
			subKeys = Object.keys( options[ keyName ] );
			for (subPropertyIterator in subKeys ){
				subKeyName = subKeys[ subPropertyIterator ];
				optionName = subKeyName;
				// Assign the object to values.
				values[ optionName ] = options[ keyName ][ subKeyName ];
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
	Configuration.prototype.togglePredef = function( name ){

		var predefinedGlobals = Object.keys( options.predefinedGlobals ),
			customPredefs,
			index,
			customPredef;
		
		// Check if the requested value is either browser, jquery, node, etc.
		if ( predefinedGlobals.indexOf( name ) !== -1 && name !== 'predef' ) {
			this[ name ].setValue( true );
			return;
		}

		// Otherwise, see if the value is predefined by Warn.js

		// If it's not defined by warn.js, throw an error.
		if ( this.predefs[ name ] === undefined ) {
			throw new Error( 'Unknown custom global' );
		}
		// Otherwise, add it to the `predef` array for JSHint.
		customPredef = this.predefs[ name ];
		// If it's an object, we'll need to load any dependencies.
		if (  customPredef.hasDeps() ) {
			var dependency,
				dependencies = customPredef.getDeps();
			for ( dependency in dependency ) {
				this.togglePredef ( dependencies[ dependency ] );
			}
			this.enablePredefs( customPredef.getData() );
			return;
		}
		// Otherwise it is an instance of Array, and values can be passed to enablePredef.
		this.enablePredefs( customPredef.getData() );
	};

	Configuration.prototype.enablePredefs = function( predefsToEnable ) {

		var predefsAlreadyEnabled = this.predef.value,
			predef;


		for ( predef in predefsToEnable ) {
			if ( predefsAlreadyEnabled.indexOf( predefsToEnable[ predef ] ) !== -1 ) {
				continue;
			}
			predefsAlreadyEnabled.push( predefsToEnable[ predef ] );
		}
	};

	Configuration.prototype.toJSON = function(){

		var options = Object.keys ( this ),
			option,
			optionName,
			optionValue,
			responseBody = {};
		
		for ( option in options ) {
			optionName = options[ option ];
			optionValue = this[ optionName ].value;
			responseBody[ optionName] = optionValue;
		}

		return responseBody;

	};

	return Configuration;

});
