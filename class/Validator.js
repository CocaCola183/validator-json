'use strict';
let _ = require('lodash');
let Schema = require('./Schema');
let Property = require('./Property');
let errorInfo = require('../lib/error.js');

/**
 * Validator
 * object  object to be validated
 * schemas schemas used to validate
 * options:
 * 	type: object || array 	default: object
 * 	
 */
class Validator {
	constructor(object, schemas, prefix) {
		prefix = prefix || 'root';

		this.object = object;
		this.schemas = schemas;
		this.prefix = prefix;

	}

	validate () {
		let errors = [];
		errors = errors.concat(validate(this.object, this.schemas, this.prefix));
		return errors;
	}
}

/**
 * check the schema is nested or not
 * @param  {[type]}  schemas schemas used to validate
 * @return {Boolean}         is nested or not
 */
function isNested (schemas) {
	if(_.isArray(schemas)) return true;
	return Object.keys(schemas).some(method => {
		return !Property.allowedMethod(method);
	})
}

/**
 * validate object
 * @param  {[type]} object  object to be validate
 * @param  {[type]} schemas schemas used to validate
 * @return {[type]}         return errors
 */
function validateObject (object, schemas, prefix) {
	let errors = [];
	for (let key in schemas) {
		let subPrefix = genPrefix(prefix, key);
		if(!_.isObject(schemas[key])) {
			throw new Error(errorInfo.confError(subPrefix, `key:${key} or schema:${schemas[key]}`));
		}
		if(isNested(schemas[key])) {
			let validator = new Validator(object[key], schemas[key], subPrefix);
			errors = errors.concat(validator.validate());
		} else {
			let schema = new Schema(object[key], schemas[key], subPrefix);
			errors = errors.concat(schema.validate());
		}
	}
	return errors;
}

/**
 * validte for none nested schema
 * @param  {[type]} object  object to be validate
 * @param  {[type]} schemas schemas used to validate
 * @return {[type]}        	return errors
 */
function validateSimpleType (object, schemas, prefix) {
	let errors = [];
	let schema = new Schema(object, schemas, genPrefix(prefix, ''));
	errors = errors.concat(schema.validate());
	return errors;
}

/**
 * validte for none nested array
 * @param  {[type]} object  object to be validate
 * @param  {[type]} schemas schemas used to validate
 * @return {[type]}        	return errors
 */
function validateSimpleArray (object, schemas, prefix) {
	let errors = [];
	if(!_.isArray(object)) {
		errors.push(`${prefix}: validate failed for type`);
		return errors;
	}
	for (let i=0; i<object.length; i++) {
		let schema = new Schema(object[i], schemas, genPrefix(prefix, i));
		errors = errors.concat(schema.validate());
	}
	return errors;
}

/**
 * validte for nested array
 * @param  {[type]} object  object to be validate
 * @param  {[type]} schemas schemas used to validate
 * @return {[type]}        	return errors
 */
function validateNestedArray (object, schemas, prefix) {
	let errors = [];
	if(!_.isArray(object)) {
		errors.push(`${prefix}: validate failed for type`);
		return errors;
	}	
	for (let i=0; i<object.length; i++) {
		errors = errors.concat(validateObject(object[i], schemas, genPrefix(prefix, i)));
	}
	return errors;
}

/**
 * run validate
 * @param  {[type]} object  object to be validate
 * @param  {[type]} schemas schemas used to validate
 * @return {[type]}        	return errors
 */
function validate (object, schemas, prefix) {
	let errors = [];
	let subPrefix = genPrefix(prefix, '');

	if(!_.isObject(schemas)) {
		throw new Error(errorInfo.confErrorWithExpected(subPrefix, schemas, 'object'));
	}

	if(_.isArray(schemas)) {
		if(!_.isObject(schemas[0])) {
			throw new Error(errorInfo.confErrorWithExpected(subPrefix, schemas[0], 'object'));
		}
		if(isNested(schemas[0])) {
			errors = errors.concat(validateNestedArray(object, schemas[0], subPrefix));
			return errors;
		} else {
			errors = errors.concat(validateSimpleArray(object, schemas[0], subPrefix));
			return errors;
		}
	}

	if(isNested(schemas)) {
		errors = errors.concat(validateObject(object, schemas, subPrefix));
		return errors;
	}

	errors = errors.concat(validateSimpleType(object, schemas, subPrefix));
	return errors;
}

const CONFERROR = 'validator configuration error';

/**
 * generate prefix
 * @param  {[type]} prefix prefix
 * @param  {[type]} key    append to prefix
 * @return {[type]}        new prefix
 */
function genPrefix (prefix, key) {
	if(_.isNumber(key)) {
		return `${prefix}[${key}]`;
	}  
	if(key === ''){
		return prefix;
	}
	return `${prefix}.${key}`
}

module.exports = Validator;

