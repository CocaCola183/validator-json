# validator

[![Build Status](https://travis-ci.org/CocaCola183/validator.svg)](https://travis-ci.org/CocaCola183/validator)

All spirits come from [validate](https://www.npmjs.com/package/validate)  

This module just fixed two issues:  
* array(simple or nested) validate  
* validate for number o, boolean false, string ''(you can see this [issue](https://github.com/eivindfjeldstad/validate/issues/23))

Only validate for:  
* type  
* exist  

##Example:  
```js
var string_schema = {  
    string1: { type: 'string', required: true },  
	string2: { type: 'string', required: true },  
	string3: { type: 'string', required: true },  
	string4: { type: 'string', required: true },  
	string5: { type: 'string', required: false },  
};  
var string_obj = {  
    string1: 'test',  
	string2: '',  
	string3: 123,  
};  
validator(string_obj, string_schema);  
```

this will return  

`[ 'validate type failed for string3', 'validate exist failed for string4' ]`

if you want more example, you can  see [this](https://github.com/CocaCola183/validator/blob/master/test/test.js)  



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


## Licence
MIT
