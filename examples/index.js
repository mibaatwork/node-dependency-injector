const DI = require('../src/nodedi').getSharedInstance();
const exampleClass = require('./module');
let ClassInstance = new exampleClass();

let serviceConfig = {
    autoload: true,
    services : {
        'logger': {
            fileName: __dirname + '/logger',
            args: [],
            shared: true
        }
    }
};

DI.setConfig(serviceConfig);

let myClass = new exampleClass();
myClass.logMessage('my message from index.js');

ClassInstance.getDIConfig();
