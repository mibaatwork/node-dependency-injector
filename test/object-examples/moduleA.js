"use strict";
let ModuleA = function() {
    let module = {};

    let constructor = function() {
        return module;
    };

    module.getName = () => {
        return 'I am moduleA';
    };

    return constructor.apply(null, arguments);
};

module.exports = ModuleA;

