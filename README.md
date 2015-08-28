# validator

[![Build Status](https://travis-ci.org/CocaCola183/validator.svg)](https://travis-ci.org/CocaCola183/validator)


All spirits come from [validate](https://www.npmjs.com/package/validate)  

This module just fixed two issues of [validate](https://www.npmjs.com/package/validate):  
* array(simple or nested) validation  
* validate for number 0, boolean false and string '' (you can see this [issue](https://github.com/eivindfjeldstad/validate/issues/23))

Only validate for:  
* type  
* exist  

##install
`npm install validator-json`

##usage

```
var validator = require('validator-json');
var errors = validator(obj, schema);
```

##example
```
var validator = require('validator-json');

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
```

if you want more example, you can see [this](https://github.com/CocaCola183/validator/blob/master/test/test.js)  


##Note  
Schema only accept 4 property:  
* type  
* required  
* elemType  
* elemSchema  

elemType and elemSchema should not exist at the same time  

if the object you want to validate like this:  
`['some string', 'hello world']`  
then you should set schema like this:  
```js
{  
    type: 'array',  
    required: true,  
    elemType: 'string'  
}  
```

if you want to validate object like this:  
```js
[
    {  
        name: 'kivi',  
        age: 100
    },  
    {  
        name: 'ivik',  
        age: 20  
    }  
]
```
then you should set schema like this:  
```js
{  
    type: 'array',  
    required: true,  
    elemSchema: {  
        name: {  
            type: 'string',  
            required: true  
        },  
        age: {  
            type: 'number',  
            required: true  
        }  
    }  
}  
```

##test
npm test


## Licence
MIT
