'use strict';
let _ = require('lodash');
let Property = require('./Property');

class Schema {
	constructor(object, schema, prefix) {
		this.object = object;
		this.schema = schema;
		this.fns = [];
		init(this.object, this.schema, this.fns, prefix);
	}

	validate() {
		let errors = [];
		this.fns.forEach(validator => {
			if(!validator.fn(this.object)) errors.push(validator.message);
		});
		return errors;
	}
}

/**
 * init validate functions
 * @param  {[type]} schema [description]
 * @param  {[type]} fns    [description]
 * @return {[type]}        [description]
 */
function init(object, schema, fns, prefix) {
	if(schema.required === false && _.isUndefined(object)) {
		let property = new Property('required', false, prefix);
		fns.push({fn: property['required'](), message: property.message});
	} else {
		for (let key in schema) {
			let property = new Property(key, schema[key], prefix);
			fns.push({fn: property[key](), message: property.message});
		}
	}
}

module.exports = Schema;