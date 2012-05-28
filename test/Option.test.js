if (typeof define !== 'function'){
	var define = require('amdefine')(module);
}

define(['../lib/options/Option'], function(Option){
	'use strict';
	describe('Option', function(){

		var option;

		describe('#constructor', function(){

			it('throws an error when a non-object is passed to it', function() {
				(function() {
					option = new Option();
				}).should.throw(/should be an object/);
			});

			it('throw an error when name, description, type or defaultValue' +
			   'is not present', function(){
				(function(){
					option = new Option({});
				}).should.throw(/name,description, type, and defaultValue required/);
			});

			it('throws an error when defaultValue is not the '+
			   'Boolean,Number,Function,String, or Object constructor', function(){
				(function(){
					option = new Option({
						'name' : 'foo',
						'description' : 'an example description',
						'type' : 'Array',
						'defaultValue' : []
					});
				}).should.throw(/must be Boolean,Number,Function,String, or Object/i);
			});
		});

		describe('#setValue', function(){
			beforeEach(function(){
				option = new Option({
					'name' : 'foo',
					'description' : 'an example option',
					'type' : Boolean,
					'defaultValue' : false
				});
			});

			it('throws an error if value passed does not have type of Option.type', function(){
				(function() {
					option.setValue('foobar');
				}).should.throw(/type/);
			});

			it('changes the value', function(){
				option.setValue(true);
				option.value.should.be.true;
			});
		});

	});
});
