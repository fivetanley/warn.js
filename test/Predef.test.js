if ( typeof define !== 'function' ) {
	var define = require( 'amdefine' )( module );
}

define( [ '../lib/Predef' ], function( Predef ) {
	'use strict';

	describe( 'Predef' , function(){

		var predefined;

		describe( '#constructor', function() {
			
			it( 'throws an error if a non-array/non-object is sent', function() {

				(function() {
					predefined = new Predef();
				}).should.throw();

				(function() {
					predefined = new Predef( 1 );
				}).should.throw();

				(function() {
					predefined = new Predef( 'foo' );
				}).should.throw();

				(function() {
					predefined = new Predef( [] );
				}).should.not.throw();

				(function() {
					predefined = new Predef({
						dict: [],
						deps: []
					});
				}).should.not.throw();

				(function() {
					predefined = new Predef({
						bad: 'bad',
						foo: 'even_worse'
					});
				}).should.throw();

			});
		});

		describe( '#getDeps' , function(){

			it( 'returns an array of dependencies if data is an Object and ' +
				'has a non-empty deps property' , function() {

				var deps;

				predefined = new Predef({
					dict: [ 'foo', 'bar', 'baz' ],
					deps: [ 'bleh' ]
				});

				deps = predefined.getDeps();

				deps.should.be.instanceOf( Array );
				deps.should.have.lengthOf( 1 );
				deps.should.containEql( 'bleh' );
				
			});

		});

		describe( '#setDeps', function() {

			beforeEach(function() {
				predefined = new Predef( [ 'foo', 'bar', 'baz' ] );
			});

			it( 'throws an error if data is an Array', function() {
				

				(function (){
					predefined.setDeps( [ 'foo', 'bar' ] );
				}).should.throw();
			});

			it( 'throws an error if definition is not an array', function() {


				(function() {
					predefined.setDeps( 'foo' );
				}).should.throw();
			});

			it( 'sets data.deps to an empty array if no definitions passed', function() {
				
				var dependencies;

				predefined = new Predef({
					dict: [ ],
					deps: [ 'foo', 'bar', 'baz']
				});

				predefined.setDeps();
				dependencies = predefined.getDeps();
				dependencies.should.be.instanceOf( Array );
				dependencies.should.have.lengthOf( 0 );
			});

			it( 'changes the dependencies when definitions passed is an Array', function() {
				var dependencies;

				predefined = new Predef({
					dict: [ ],
					deps: [ ]
				});

				predefined.setDeps( [ 'foo', 'bar', 'baz' ] );
				dependencies = predefined.getDeps();
				dependencies.should.be.instanceOf( Array );
				dependencies.should.have.lengthOf( 3 );
				dependencies.should.containEql( 'foo' );
				dependencies.should.containEql( 'bar' );
				dependencies.should.containEql( 'baz' );
			});

		});

		describe( '#getDict', function() {
		
			var dict1 = [ 'foo', 'bar', 'baz' ],
				dict2 = [ 'bing', 'bang', 'bung' ],
				predefined = new Predef({
					dict: dict1,
					deps: [ ]
				}),
				predefined2 = new Predef( dict2 );



			it( 'returns the dictionary of predefined globals', function() {
				dict1.map( function( word ) {
					predefined.getDict().should.containEql( word );
				});
				dict2.map( function( word) {
					predefined2.getDict().should.containEql( word );
				});	
			});
		});

	});

});
