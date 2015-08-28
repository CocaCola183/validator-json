var validator = require('..');

var schema = {
	name: {
		first_name: { type: 'string', required: true },
		last_name: { type: 'string', required: true }
	},
	nickname: { type: 'string', required: false },
	age: { type: 'number', required: true },
	married: { type: 'boolean', required: true },
	hobbies: { type: 'array', required: true, elemType: 'string'},
	games_loved: { 
		type: 'array',
		required: true,
		elemSchema: {
			name: { type: 'string', required: true },
			years_played: { type: 'number', required: true }
		}
	}
}

var object4pass = {
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

var object4npass = {
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

console.log('object for pass: \n', validator(object4pass, schema), '\n');
console.log('object for not pass: \n', validator(object4npass, schema), '\n');

