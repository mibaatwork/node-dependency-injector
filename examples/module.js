const DI = require('../src/nodedi');

class exampleClass {
    constructor(config = {}) {
    }

    logMessage(message) {
        let logger = DI.get('@logger');
        logger.info('log inside Module with message: ' + message);
    }

    getDIConfig() {
        let config = DI.getConfig();
        console.log(config);
    }
}

module.exports = exampleClass;

