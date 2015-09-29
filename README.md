# validator-json

[![npm version](https://img.shields.io/npm/v/validator-json.svg)](https://npmjs.org/package/validator-json)
[![Build Status](https://travis-ci.org/CocaCola183/validator-json.svg?branch=master)](https://travis-ci.org/CocaCola183/validator-json)
[![Coverage Status](https://coveralls.io/repos/CocaCola183/validator-json/badge.svg?branch=master&service=github)](https://coveralls.io/github/CocaCola183/validator-json?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/validator-json.svg)](https://npmjs.org/package/validator-json)  

All spirits come from [validate](https://www.npmjs.com/package/validate)  

This module just fixed two issues of [validate](https://www.npmjs.com/package/validate):  
* array(simple or nested) validation  
* validate for number 0, boolean false and string '' (you can see this [issue](https://github.com/eivindfjeldstad/validate/issues/23))

now only validate for:  
* type  
* exist  

## Before you start  
* node: 4.1.1  

validator-json@2.0 only support node@4.0+, if you use node@0.12-, you can use  validator-json@1.0

## Install  
`npm install validator-json`

## Usage  
```js
let Validator = require('validator-json');
let validator = new Validator(object, schema);
let errors = validator.validate();
```

## Example  
```js
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
```

if you want more example, you can see [this](https://github.com/CocaCola183/validator/blob/master/test/test.js)  


## Note    
Schema only accept 2 property:  
* type  
* required  

## Test  
npm test


## Licence
MIT
