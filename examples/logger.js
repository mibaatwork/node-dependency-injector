const logger = function() {
    let _this = {};

    let constructor = function() {
        return _this;
    };

    _this.info = (message) => {
       console.log(message)
    };

    return constructor.apply(null, arguments);
};

module.exports = logger;
