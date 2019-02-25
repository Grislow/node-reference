var greet = require('./greet');

// Native module
var util = require('util');

greet.polish('Jan Kowalski');
greet.english('John Smith');
greet.spanish('Juan Alvarez');
greet.german('Jonas Schmidt');

/* 
    The reference is cached
*/
var obj = require('./greet').testObj;
obj.func();
    //> 10
obj.prop = 20;
obj.func();
    //> 20
var newObj = require('./greet').testObj;
newObj.func();
    //> 20
    // obj and newObj both reference the same object

/*
    To instantiate you need the constructor
*/
var Obj = require('./greet').Obj;
var obj2 = new Obj();
obj2.func();
    //> 10
    // now you have another instance

var test = 'Sample';

var utilExample = util.format('%s of utility module', test);

util.log(utilExample);