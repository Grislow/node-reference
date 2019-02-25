var languages = require('./greet.json');
var english = require('./english');
var polish = require('./polish');

var greet = function(lang) {
    return function(name) {
        console.log(lang + ' ' + name);
    };
}

function Obj() {
    this.prop = 10;
    this.func = function() {
        console.log('prop -> ' + this.prop);
    }
}

module.exports = {
    english: english,
    polish: polish,
    
    // Revealing Module Pattern
    spanish: greet(languages['es']),
    german: greet(languages['de']),

    testObj: new Obj(),
    Obj: Obj
};

