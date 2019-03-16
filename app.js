var emitter = require('./emitter');
var eventConfig = require('./config').events;

// ************************************
var emtr = emitter();

emtr.on(eventConfig.GREET, function() {
    console.log('A greeting event has been triggered');
});

emtr.on(eventConfig.GREET, function() {
    console.log('Hi back at ya');
});

emtr.emit(eventConfig.GREET);
    //> A greeting event has been triggered
    //> Hi back at ya

// ************************************
var deutschHello = {
    hello: 'Tschus Freund!'
}

var greet = {
    greet: function() {
        console.log(this.hello);
        this.emit(eventConfig.GREET);
    }
}

var Hanz = Object.assign({}, deutschHello, greet, Object.getPrototypeOf(emtr));
Hanz.on(eventConfig.GREET, () => {
    console.log('Hi Friend = ' + Hanz.hello);
})

Hanz.greet();
// ************************************

