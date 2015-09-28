'use strict';

let Validator = require('..');

let schema = {
	name: {
		first_name: { type: 'string', required: true },
		last_name: { type: 'string', required: true }
	},
	nickname: { type: 'string', required: false },
	age: { type: 'number', required: true },
	married: { type: 'boolean', required: true },
	hobbies: [{ type: 'string', required: true }],
	games_loved: [{
			name: { type: 'string', required: true },
			years_played: { type: 'number', required: true }
		}]
}

let object4pass = {
	name: {first_name: 'Xv', last_name: 'kivi'},
	nickname: 'hammer',
	age: 23,
	married: false,
	hobbies: ['computer games', 'basketball'],
	games_loved: [
		{
			name: 'dota',
			years_played: 4
		},
		{
			name: 'lol',
			years_played: 1
		}
	]
}

let object4npass = {
	name: 'hello',
	nickname: 999,
	age: '23',
	married: 'false',
	hobbies: ['computer games', 999],
	games_loved: [
		{
			name: 'dota'
		},
		{
			years_played: 1
		}
	]
}

let passValidator = new Validator(object4pass, schema, 'object4npass');
let passErrors = passValidator.validate();

let npassValidator = new Validator(object4npass, schema, 'object4npass');
let npassError = npassValidator.validate();

console.log('object for pass: \n', passErrors, '\n');
console.log('object for not pass: \n', npassError, '\n');

