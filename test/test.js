'use strict';
let Validator = require('../class/Validator');
let should = require('should');

// test for error schema
let errorSchema1 = {
	type: 'string1',
	required: true
};

describe('Test 1 for error schema', function() {
	it('should get errors like this: validator configuration error[root]: string1 is illegal, expected to be string/number/boolean', function () {
		try{
			let validator = new Validator('string', errorSchema1);
			let errors = validator.validate();
		} catch (e) {
			e.message.should.eql('validator configuration error[root]: string1 is illegal, expected to be string/number/boolean');
		}
	});
});


let errorSchema2 = {
	type1: 'string',
	required: true
};

describe('Test 2 for error schema', function() {
	it('should get errors like this: validator configuration error[errorSchemaValidator.type1]: key:type1 or schema:string is illegal', function () {
		try{
			let validator = new Validator('string', errorSchema2, 'errorSchemaValidator');
			let errors = validator.validate();
		} catch (e) {
			e.message.should.eql('validator configuration error[errorSchemaValidator.type1]: key:type1 or schema:string is illegal');
		}
	});
});


let errorSchema3 = {
	type: 'string',
	required: '123'
};

describe('Test 3 for error schema', function() {
	it('should get errors like this: validator configuration error[errorSchemaValidator]: 123 is illegal, expected to be true/false', function () {
		try{
			let validator = new Validator('string', errorSchema3, 'errorSchemaValidator');
			let errors = validator.validate();
		} catch (e) {
			e.message.should.eql('validator configuration error[errorSchemaValidator]: 123 is illegal, expected to be true/false');
		}
	});
});


let errorSchema4 = 'string';

describe('Test 4 for error schema', function() {
	it('should get errors like this: validator configuration error[errorSchemaValidator]: string is illegal, expected to be object', function () {
		try{
			let validator = new Validator('string', errorSchema4, 'errorSchemaValidator');
			let errors = validator.validate();
		} catch (e) {
			e.message.should.eql('validator configuration error[errorSchemaValidator]: string is illegal, expected to be object');
		}
	});
});


let errorSchema5 = ['string'];

describe('Test 5 for error schema', function() {
	it('should get errors like this: validator configuration error[errorSchemaValidator]: string is illegal, expected to be object', function () {
		try{
			let validator = new Validator('string', errorSchema5, 'errorSchemaValidator');
			let errors = validator.validate();
		} catch (e) {
			e.message.should.eql('validator configuration error[errorSchemaValidator]: string is illegal, expected to be object');
		}
	});
});


// test for simple type
let simpleString = 123;
let simpleSchema1 = {
	type: 'string',
	required: true
};
let simple_string_expected_error = [ 'simpleStringValidator: validate failed for type' ];

describe('Test for simple string', function() {
	it(`should get errors like this: ${JSON.stringify(simple_string_expected_error)}`, function () {
		let validator = new Validator(simpleString, simpleSchema1, 'simpleStringValidator');
		let errors = validator.validate();
		errors.should.eql(simple_string_expected_error);
	});
});


// test for string validate
let string_schema = {
	string1: { type: 'string', required: true },
	string2: { type: 'string', required: true },
	string3: { type: 'string', required: true },
	string4: { type: 'string', required: true },
	string5: { type: 'string', required: false },
	string6: { type: 'string', required: false }
}

let string_obj = {
	string1: 'test',
	string2: '',
	string3: 123,
	string6: 123
}

let string_expected_error = [ 'stringValidator.string3: validate failed for type',
  'stringValidator.string4: validate failed for type',
  'stringValidator.string4: validate failed for required',
  'stringValidator.string6: validate failed for type'];

describe('Test for string, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(string_expected_error), function () {
		let validator = new Validator(string_obj, string_schema, 'stringValidator');
		let errors = validator.validate();
		errors.should.eql(string_expected_error);
	});
});

// test for number validate
let number_schema = {
	number1: { type: 'number', required: true },
	number2: { type: 'number', required: true },
	number3: { type: 'number', required: true },
	number4: { type: 'number', required: true },
	number5: { type: 'number', required: false },
}

let number_obj = {
	number1: 123,
	number2: 0,
	number3: 'test',
	number5: 'test',
};

let number_expected_error = [
  'numberValidator.number3: validate failed for type',
  'numberValidator.number4: validate failed for type',
  'numberValidator.number4: validate failed for required',
  'numberValidator.number5: validate failed for type'
];

describe('Test for number, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(number_expected_error), function () {
		let validator = new Validator(number_obj, number_schema, 'numberValidator');
		let errors = validator.validate();
		errors.should.eql(number_expected_error);
	});
});


// test for boolean validate 
let boolean_schema = {
	boolean1: { type: 'boolean', required: true },
	boolean2: { type: 'boolean', required: true },
	boolean3: { type: 'boolean', required: true },
	boolean4: { type: 'boolean', required: true },
	boolean5: { type: 'boolean', required: false },
}

let boolean_obj = {
	boolean1: true,
	boolean2: false,
	boolean3: 'test',
	boolean4: 'test',
};

let boolean_expected_error = [
  'booleanValidator.boolean3: validate failed for type',
  'booleanValidator.boolean4: validate failed for type'
];

describe('Test for boolean, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(boolean_expected_error), function () {
		let validator = new Validator(boolean_obj, boolean_schema, 'booleanValidator');
		let errors = validator.validate();
		errors.should.eql(boolean_expected_error);
	});
});

// test for array of simple type
// --- validate for type
let simple_array_shcema = [{
	type: 'string',
	required: true
}];

let simple_array_obj = ['test', 123, 'test'];

let simple_array_expected_error = ['simpleArrayValidator[1]: validate failed for type'];

describe('Test for simple array, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(simple_array_expected_error), function () {
		let validator = new Validator(simple_array_obj, simple_array_shcema, 'simpleArrayValidator');
		let errors = validator.validate();
		errors.should.eql(simple_array_expected_error);
	});
});

// --- validate for array in object
let simple_array_shcema1 = {
	name: [{
		type: 'string',
		required: true
	}]
};

let simple_array_obj1 = {name:  ['test', 123, 'test'] };

let simple_array_expected_error1 = [ 'simpleArray1Validator.name[1]: validate failed for type' ];

describe('Test for simple array, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(simple_array_expected_error1), function () {
		let validator = new Validator(simple_array_obj1, simple_array_shcema1, 'simpleArray1Validator');
		let errors = validator.validate();
		errors.should.eql(simple_array_expected_error1);
	});
});

// // --- validate for array type
// let simple_array_schema_2 = [{}];

// let simple_array_obj2 = {};

// let simple_array_expected_error2 = [ 'validate type failed for Array' ];

// describe('Test for simple array type', function() {
// 	it('Should get errors like this: ' + JSON.stringify(simple_array_expected_error2), function() {
// 		let errors = validator(simple_array_obj2, simple_array_schema_2);
// 		if(!equalArray(errors, simple_array_expected_error2)) assert.fail(errors, simple_array_expected_error2, 'Test failed');
// 	});
// });

// --- validate for array type in object
let simple_array_schema3 = {
	string1: {type: 'string', required: true},
	array1: [{type: 'string', required: true}]
};

let simple_array_obj3 = {
	string1: 'string',
	array1: 'error'
};

let simple_array_expected_error3 = [ 'simpleArray1Validator.array1: validate failed for type' ];

describe('Test for simple array type in object', function() {
	it('Shoule get errors like this: ' + JSON.stringify(simple_array_expected_error3), function() {
		let validator = new Validator(simple_array_obj3, simple_array_schema3, 'simpleArray1Validator');
		let errors = validator.validate();
		errors.should.eql(simple_array_expected_error3);
	});
});

// test for nested array
let nested_array_schema = [{
		elem1: { type: 'string', required: true },
		elem2: { type: 'string', required: false },
		elem3: { type: 'number', required: true },
		elem4: { type: 'boolean', required: true }
	}]


let nested_array_obj = [
	{elem1: 'test', elem2: 'test', elem3: 123, elem4: false},
	{elem1: 123, elem2: 123, elem3: 'test', elem4: true},
	{}
];

let nested_array_expected_error = [
  'simpleArray1Validator[1].elem1: validate failed for type',
  'simpleArray1Validator[1].elem2: validate failed for type',
  'simpleArray1Validator[1].elem3: validate failed for type',
  'simpleArray1Validator[2].elem1: validate failed for type',
  'simpleArray1Validator[2].elem1: validate failed for required',
  'simpleArray1Validator[2].elem3: validate failed for type',
  'simpleArray1Validator[2].elem3: validate failed for required',
  'simpleArray1Validator[2].elem4: validate failed for type',
  'simpleArray1Validator[2].elem4: validate failed for required'
];

describe('Test for nested array, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(nested_array_expected_error), function () {
		let validator = new Validator(nested_array_obj, nested_array_schema, 'simpleArray1Validator');
		let errors = validator.validate();
		errors.should.eql(nested_array_expected_error);
	});
});

// --- validate for error nested array
let errorArrayObject = 'kivi';
let errorArraySchema = [{name: {type: 'string', required: 'true'}}];
let error_array_expected_error = ['errorArrayValidator: validate failed for type'];

describe('Test for error nested array', function() {
	it('should get errors like this: ' + JSON.stringify(error_array_expected_error), function () {
		let validator = new Validator(errorArrayObject, errorArraySchema, 'errorArrayValidator');
		let errors = validator.validate();
		errors.should.eql(error_array_expected_error);
	});
});




// test for object 
let object_schema = {
	obj1: {
			obj1_1: {
				obj1_1_1: { type: 'string', required: true },
				obj1_1_2: { type: 'number', required: true }
		}
	},
	obj2: { type: 'boolean', required: true }
}

let object_obj = {
	obj1: {
		obj1_1: {
			obj1_1_1: 'test',
			obj1_1_2: 'test'
		}
	},
	obj2: false
};

let object_obj_expected_error = [
  'simpleArray1Validator.obj1.obj1_1.obj1_1_2: validate failed for type'
];

describe('Test for object, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(object_obj_expected_error), function () {
		let validator = new Validator(object_obj, object_schema, 'simpleArray1Validator');
		let errors = validator.validate();
		errors.should.eql(object_obj_expected_error);
	});
});


