"use strict";
const ModuleB = function() {
    let module = {};

    let constructor = function(lambdaFunction, moduleA) {
        module.externalFunction = lambdaFunction;
        module.externalModule = moduleA;
        return module;
    };

    module.getInjectedModuleName = () => {
        return module.externalModule.getName();
    };

    module.executeLambdaFunction = () => {
        return module.externalFunction();
    };

    module.getName = () => {
        return 'I am moduleB';
    };

    return constructor.apply(null, arguments);
};

module.exports = ModuleB;

