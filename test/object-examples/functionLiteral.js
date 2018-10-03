"use strict";
const functionLiteral = function() {
    let _this = {};

    let constructor = function() {
        return _this;
    };

    _this.sayHello = () => {
        return 'hello from my functionLiteral';
    };

    return constructor.apply(null, arguments);
};

module.exports = functionLiteral;

