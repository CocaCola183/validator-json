var assert = require('assert-plus');
var validator = require('..');

// test for string validate
var string_schema = {
	string1: { type: 'string', required: true },
	string2: { type: 'string', required: true },
	string3: { type: 'string', required: true },
	string4: { type: 'string', required: true },
	string5: { type: 'string', required: false },
}

var string_obj = {
	string1: 'test',
	string2: '',
	string3: 123,
}

var string_expected_error = [ 'validate type failed for string3', 'validate exist failed for string4' ];

describe('Test for string, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(string_expected_error), function () {
		var errors = validator(string_obj, string_schema);
		if(!equalArray(errors, string_expected_error)) assert.fail(errors, string_expected_error, 'Test failed');
	});
});

// test for number validate
var number_schema = {
	number1: { type: 'number', required: true },
	number2: { type: 'number', required: true },
	number3: { type: 'number', required: true },
	number4: { type: 'number', required: true },
	number5: { type: 'number', required: false },
}

var number_obj = {
	number1: 123,
	number2: 0,
	number3: 'test',
	number5: 'test',
};

var number_expected_error = [ 'validate type failed for number3', 'validate exist failed for number4' ];

describe('Test for number, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(number_expected_error), function () {
		var errors = validator(number_obj, number_schema);
		if(!equalArray(errors, number_expected_error)) assert.fail(errors, string_expected_error, 'Test failed');
	});
});


// test for boolean validate 
var boolean_schema = {
	boolean1: { type: 'boolean', required: true },
	boolean2: { type: 'boolean', required: true },
	boolean3: { type: 'boolean', required: true },
	boolean4: { type: 'boolean', required: true },
	boolean5: { type: 'boolean', required: false },
}

var boolean_obj = {
	boolean1: true,
	boolean2: false,
	boolean3: 'test',
	boolean4: 'test',
};

var boolean_expected_error = [ 'validate type failed for boolean3', 'validate type failed for boolean4' ];

describe('Test for boolean, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(boolean_expected_error), function () {
		var errors = validator(boolean_obj, boolean_schema);
		if(!equalArray(errors, boolean_expected_error)) assert.fail(errors, boolean_expected_error, 'Test failed');
	});
});

// test for array of simple type
// --- validate for type
var simple_array_shcema = {
	type: 'array',
	required: true,
	elemType: 'string'
};

var simple_array_obj = ['test', 123, 'test'];

var simple_array_expected_error = [ 'validate type failed for Array.1' ];

describe('Test for simple array, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(simple_array_expected_error), function () {
		var errors = validator(simple_array_obj, simple_array_shcema);
		if(!equalArray(errors, simple_array_expected_error)) assert.fail(errors, simple_array_expected_error, 'Test failed');
	});
});

// --- validate for array in object
var simple_array_shcema1 = {
	name: {
		type: 'array',
		required: true,
		elemType: 'string'
	}
};

var simple_array_obj1 = {name:  ['test', 123, 'test'] };

var simple_array_expected_error1 = [ 'validate type failed for name.1' ];

describe('Test for simple array, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(simple_array_expected_error1), function () {
		var errors = validator(simple_array_obj1, simple_array_shcema1);
		if(!equalArray(errors, simple_array_expected_error1)) assert.fail(errors, simple_array_expected_error1, 'Test failed');
	});
});

// --- validate for array type
var simple_array_schema_2 = {
	type: 'array',
	required: true,
	elemType: 'string'
};

var simple_array_obj2 = {};

var simple_array_expected_error2 = [ 'validate type failed for Array' ];

describe('Test for simple array type', function() {
	it('Should get errors like this: ' + JSON.stringify(simple_array_expected_error2), function() {
		var errors = validator(simple_array_obj2, simple_array_schema_2);
		if(!equalArray(errors, simple_array_expected_error2)) assert.fail(errors, simple_array_expected_error2, 'Test failed');
	});
});

// --- validate for array type in object
var simple_array_schema3 = {
	string1: {type: 'string', required: true},
	array1: {
		type: 'array',
		required: true,
		elemType: 'string'
	}
};

var simple_array_obj3 = {
	string1: 'string',
	array1: 'error'
};

var simple_array_expected_error3 = [ 'validate type failed for array1' ];

describe('Test for simple array type in object', function() {
	it('Shoule get errors like this: ' + JSON.stringify(simple_array_expected_error3), function() {
		var errors = validator(simple_array_obj3, simple_array_schema3);
		if(!equalArray(errors, simple_array_expected_error3)) assert.fail(errors, simple_array_expected_error3, 'Test failed');
	});
});

// test for nested array
var nested_array_schema = {
	type: 'array',
	required: true,
	elemSchema: {
		elem1: { type: 'string', required: true },
		elem2: { type: 'string', required: false },
		elem3: { type: 'number', required: true },
		elem4: { type: 'boolean', required: true }
	}
};

var nested_array_obj = [
	{elem1: 'test', elem2: 'test', elem3: 123, elem4: false},
	{elem1: 123, elem2: 123, elem3: 'test', elem4: true},
	{}
];

var nested_array_expected_error = [ 
	'validate type failed for Array.1.elem1',
  'validate type failed for Array.1.elem3',
  'validate exist failed for Array.2.elem1',
  'validate exist failed for Array.2.elem3',
  'validate exist failed for Array.2.elem4' 
  ];

describe('Test for nested array, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(nested_array_expected_error), function () {
		var errors = validator(nested_array_obj, nested_array_schema);
		if(!equalArray(errors, nested_array_expected_error)) assert.fail(errors, nested_array_expected_error, 'Test failed');
	});
});

// test for object 
var object_schema = {
	obj1: {
			obj1_1: {
				obj1_1_1: { type: 'string', required: true },
				obj1_1_2: { type: 'number', required: true }
		}
	},
	obj2: { type: 'boolean', required: true }
}

var object_obj = {
	obj1: {
		obj1_1: {
			obj1_1_1: 'test',
			obj1_1_2: 'test'
		}
	},
	obj2: false
};

var object_obj_expected_error = [ 'validate type failed for obj1.obj1_1.obj1_1_2' ];

describe('Test for object, include type, required and empty string', function() {
	it('should get errors like this: ' + JSON.stringify(object_obj_expected_error), function () {
		var errors = validator(object_obj, object_schema);
		if(!equalArray(errors, object_obj_expected_error)) assert.fail(errors, object_obj_expected_error, 'Test failed');
	});
});

// console.log(validator(string_obj, string_schema));
// console.log(validator(number_obj, number_schema));
// console.log(validator(boolean_obj, boolean_schema));
// console.log(validator(simple_array_obj, simple_array_shcema));
// console.log(validator(simple_array_obj1, simple_array_shcema1));
// console.log(validator(nested_array_obj, nested_array_schema));
// console.log(validator(object_obj, object_schema));
// console.log(validator(simple_array_obj2, simple_array_schema_2));
// console.log(validator(simple_array_obj3, simple_array_schema3));

// check two arrays equal or not
function equalArray (arr1, arr2) {
	if(arr1.length !== arr2.length) return false;
	var tmp_obj = {};
	arr1.forEach(function(elem) { tmp_obj[elem] = true; });
	return arr2.every(function(elem) { return tmp_obj[elem]; });
}


