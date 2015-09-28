'use strict';

let _ = require('lodash');
let errorInfo = require('../lib/error.js');

/**
 * TODO
 * write own typeof function 
 */

class Property {
	constructor(name, schema, prefix) {
		validateParams(name, schema, prefix);
		this.name = name;
		this.schema = schema;
		this.message = errorInfo.propMessage(prefix, name);
	}

	type() {
		return type(this.schema);
	}

	required() {
		return required(this.schema);
	}

	static allowedMethod (method) {
		return ALLOWEDMETHOD[method];
	}
}

const CONFERROR = 'validator configuration error';

/**
 * validate params
 * @return {[type]} [description]
 */
function validateParams (name, schema, prefix) {
	// if(!ALLOWEDMETHOD[name]) throw new Error(`${CONFERROR}[${prefix}]: ${name} is an illegal method`);
	schemaValidator[name](schema, prefix);
}

const schemaValidator = {
	type: function(schema, prefix) {
		if(!TYPE[schema]) throw new Error(errorInfo.confErrorWithExpected(prefix, schema, Object.keys(TYPE).join('/')));
	},
	required: function(schema, prefix) {
		if(!_.isBoolean(schema)) throw new Error(errorInfo.confErrorWithExpected(prefix, schema, 'true/false'));
	}
}

/**
 * property allowed validate method
 * @type {Object}
 */
const ALLOWEDMETHOD = {
	type: true,
	required: true
};

/**
 * property allowed type
 * @type {Object}
 */
const TYPE = {
	string: function(value) {
		return _.isString(value);
	},
	number: function(value) {
		return _.isNumber(value);
	},
	boolean: function(value) {
		return _.isBoolean(value);
	}
};

/**
 * validate type
 * @param  {[type]} schema [description]
 * @return {[type]}        [description]
 */
function type(schema) {
	return function(value) {
		return TYPE[schema](value);
	}
}


function required(schema) {
	return function(value) {
		if(schema === false) return true;
		if(!_.isUndefined(value) && !_.isNaN(value) && !_.isNull(value)) return true;
	}
}


module.exports = Property;
