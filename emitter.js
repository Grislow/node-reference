var emitterFactory = function() {
    var events = {};

    var proto = {
        on: function(type, listener) {
            events[type] = events[type] || [];
            events[type].push(listener);
        },
        emit: function(type) {
            if(events[type]) {
                events[type].forEach(function(listener) {
                    listener();
                });
            }
        }
    }

    return Object.create(proto);
}

module.exports = emitterFactory;