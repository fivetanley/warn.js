if ( typeof define !== 'function' ) {
	var define = require('amdefine')(module);
}

define( [ '../lib/Configuration', '../lib/options/index', '../lib/Option',
	'../lib/Predef' ],
	function( Configuration, options, Option, Predef ) {
	'use strict';	

	describe( 'Configuration', function(){

		var config;

		beforeEach( function() {
			config = new Configuration();
		});

		describe( 'prototype.defaultValues', function() {
			
			it( 'exists on the prototype', function() {
				config.should.not.have.ownProperty( 'defaultValues' );
				Configuration.prototype.defaultValues.should.be.type('object');
			});

			it( 'contains all the default values for options', function() {

				var generalKeys,
					predefinedGlobalsKeys,
					developmentKeys,
					ecma5Keys,
					goodPartsKeys,
					stylePrefsKeys,
					masterKeys,
					iterator = 0,
					key;
				
				// Load property keys.
				generalKeys = Object.keys( options.general );
				predefinedGlobalsKeys = Object.keys( options.predefinedGlobals );
				developmentKeys = Object.keys( options.development );
				ecma5Keys = Object.keys( options.ecma5 );
				goodPartsKeys = Object.keys( options.goodParts );
				stylePrefsKeys = Object.keys( options.stylePrefs );

				// Combine all keys into one list for easy iteration.
				masterKeys = [].concat( generalKeys ).concat( predefinedGlobalsKeys )
					.concat( developmentKeys ).concat( ecma5Keys )
					.concat( goodPartsKeys ).concat( stylePrefsKeys);

				masterKeys.should.be.instanceOf(Array);

				masterKeys.map( function( key ) {	
					config.should.have.ownProperty( key );
					config[ key ].should.be.instanceOf( Option );
					config[ key ].defaultValue.should.equal( Configuration.prototype
						.defaultValues[ key ].defaultValue );
				});

			});
		});

		describe( 'prototype.predefs' , function(){

			var predefs;

			beforeEach( function() {
				predefs = Configuration.prototype.predefs;
			});

			it( 'exists on the prototype', function() {
				config.should.not.have.ownProperty( 'predefs' );
				predefs.should.be.type('object');
				config.should.be.type('object');
			});

			it ( 'has a Predef instance for every key', function() {
				var predefinedGlobals = Object.keys( predefs ),
					iterator,
					predefinedGlobal;
				predefinedGlobals.map( function( predefinedGlobal ) {
					predefs[ predefinedGlobal ].should.be.instanceOf( Predef );
				});
					
			});


		});

		describe( '#constructor' , function() {

			it( 'loads the defaults if nothing is passed', function() {

				var defaultValues = Configuration.prototype.defaultValues,
					defaultValuesList = Object.keys ( defaultValues ),
					iterator,
					key,
					configValue,
					defaultValue;
				
				defaultValuesList.map(function( key ) {
					configValue = config[ key ].value;
					defaultValue = defaultValues[ key ].defaultValue;
					configValue.should.equal( defaultValue );
				});

			});



			it( 'sets a value to the passed value', function() {
				config = new Configuration({
					'predef' : [ 'foo', 'bar' ]
				});

				// Check the value passed.
				config.should.have.ownProperty( 'predef' );
				config.predef.value.should.be.instanceOf( Array );

				// Value not passed should have the default value.
				config.should.have.ownProperty( 'white' );
				config.white.value.should.equal( false );
			});

		});

		describe( '#set', function() {
		
			it( 'changes the value of the passed property', function(){
				
				var plusPlusVal = config.plusplus.value;
				config.set( 'plusplus', true );
				config.plusplus.value.should.not.equal( plusPlusVal );
				config.plusplus.value.should.equal( true );
			});

			it( 'returns the new value of the passed option', function(){

				config.set( 'plusplus', true).should.equal( true );
			});

			it( 'throws an error if option name isn\'t supported by JSHint', function() {
				(function() {
					config.set( 'foo', true);
				}).should.throw();
			});
		});

		describe( '#enablePredef', function() {

			it( 'enables jshint predefined globals if first '+
				'parameter matches a jshint predefined global like jquery', function() {
				config.enablePredef( 'jquery' );
				config.jquery.value.should.equal( true );
			});

			it( 'enables third-party predefined globals as defined by Warn or custom', function(){
				config.enablePredef( 'knockout' );
				config.predef.value.should.containEql( config.predefs.knockout.getDict()[0]);
			});

			it( 'loads dependencies for any predefs like knockback that require other predefined globals', function(){
				config.enablePredef( 'knockback' );
				config.predef.value.should.containEql( config.predefs.knockout.getDict()[0] );
				config.predef.value.should.containEql( 'kb' );
			});

		});

	});
});
