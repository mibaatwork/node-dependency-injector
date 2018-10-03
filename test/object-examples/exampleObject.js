"use strict";
module.exports = function Module() {
    let _this = {};
    let _name = '';

    let constructor = function(name) {
        _name = name;
        return _this;
    };

    _this.getName = () => {
        return _name;
    };

    return constructor.apply(null, arguments);
};


