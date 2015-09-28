'use strict';

const CONFERROR = 'validator configuration error';

module.exports = {
	propMessage: function(prefix, name) {
		return `${prefix}: validate failed for ${name}`;
	},
	confErrorWithExpected: function(prefix, schema, expected) {
		return `${CONFERROR}[${prefix}]: ${schema} is illegal, expected to be ${expected}`;
	},
	confError: function(prefix, schema) {
		return `${CONFERROR}[${prefix}]: ${schema} is illegal`;
	}
}