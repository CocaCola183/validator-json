#!/usr/bin/env node
var assert = require('assert-plus')

function validator (obj, schema, path) {
	assert.object(obj, 'Object to be validate');
	assert.object(schema, 'Schema used to validate');
	path = path || '';

	var errors = [];

	// handle array
	if(schema.type === 'array') {

		// validate type
		if(!Array.isArray(obj)) {
			var tmp_path = path === '' ? 'Array' : path;
			errors.push('validate type failed for ' + tmp_path);
			return errors;
		}

		// validate nested array
		if(schema.elemSchema && obj.length) {
			obj.forEach(function(elem, i) {
				errors = errors.concat(validator(elem, schema.elemSchema, prefix(path || 'Array', i)));
			});
			return errors;
		} 

		// validate simple array
		if(schema.elemType && obj.length) {
			obj.forEach(function(elem, i) {
				if(typeof(elem) !== schema.elemType) {
					errors.push('validate type failed for ' + prefix(path || 'Array', i));
				}
			});
			return errors;
		}

	}

	// handle object
	for(var key in schema) {

		var type = schema[key]['type'];
		var required = schema[key]['required'];
		var elemType = schema[key]['elemType'];
		var elemSchema = schema[key]['elemSchema'];
		var value = obj[key];

		assert.optionalString(type, key + '.type');
		assert.optionalBool(required, key + '.required');
		assert.optionalString(elemType, key + '.elemType');
		assert.optionalObject(elemSchema, key + '.elemSchema');

		// check if is required
		if(required === false) {
			continue;
		}

		// check allowed && existed
		if(!isExist(value, type)) {
			errors.push('validate exist failed for ' + prefix(path, key));
			continue;
		}

		// handle nested object
		if(typeof(value) === 'object') {
			errors = errors.concat(validator(value, schema[key], prefix(path, key)));
			continue;
		}

		// check for type
		if(type && typeof(value) !== type) {
			errors.push('validate type failed for ' + prefix(path, key));
		}

		// check for exist
		if(!(required && isExist(value, type))) {
			errors.push('validate value failed for ' + prefix(path, key));
		}

	}

	return errors;
}

function isExist (value, type) {
	return !!value || 
					(value === 0 && type === 'number') ||
					(value === '' && type === 'string') ||
					(value === false && type === 'boolean');
}

function prefix (prefix, key) {
	return  prefix ? (prefix + '.' + key) : key;
}

module.exports = validator;