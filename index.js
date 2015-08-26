#!/usr/bin/env node
var assert = require('assert-plus')

module.exports = function (obj, schema) {

	var errors = [];

	for(var key in schema) {

		var type = schema[key]['type'];
		var required = schema[key]['required'];
		var elemType = schema[key]['elemType'];
		var elemSchema = schema[key]['elemSchema'];
		var value = obj[key];

		assert.optionalString(type, key + '.type');
		assert.optionalBool(required, key + '.required');
		assert.optionalString(elemType, key + '.elemType');
		assert.optionalString(elemSchema, key + '.elemSchema');

		// check if is required
		if(required === false) {
			continue;
		}

		// check allowed
		if(!isAllowedValue(value)) {
			errors.push(key + ' is not exist');
			continue;
		}

		// handle array
		if(type === 'array') {

			// validate type
			if(!Array.isArray(value)) {
				errors.push(key + 'is not an array');
				continue;
			}

			// validate nested array
			if(elemSchema && value.length) {
				value.forEach(function(elem) {
					errors = errors.concat(validator(elem, elemSchema));
				});
				continue;
			} 

			// validate simple array
			if (elemType && value.length) {
				obj[key].forEach(function(elem, i) {
					if(typeof(elem) !== schema[key]['elem_type']) {
						errors.push('validate failed for ' + key + ':' + i);
					}
				});
				continue;
			}

		}

		// handle nested object
		if(typeof(value) === 'object') {
			errors = errors.concat(validator(value, schema[key]));
			continue;
		}

		// check for type
		if(type && typeof(value) !== type) {
			errors.push('validate type failed for ' + key);
		}

		// check for exist
		if(required && isExist(value, type)) {
			errors.push('validate value failed for ' + key);
		}

	}

	return errors;
}

function isAllowedValue (value) {
	return !!value ||
				 value === 0 ||
				 value === '' ||
				 value === false;
}

function isExist(value, type) {
	return !!value || 
					(value === 0 && type === 'number') ||
					(value === '' && type === 'string') ||
					(value === false && type === 'boolean');
}