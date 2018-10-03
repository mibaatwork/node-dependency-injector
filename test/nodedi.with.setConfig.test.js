// Get the DI Object not a Instance
const DI = require('../src/nodedi').getDic();

const config = require('./config/testconfiguration')();

let DIC;

describe('DI with injected config by using setConfig:', () => {
    beforeEach(() => {
        DIC = new DI();
        DIC.setConfig(config);
    });

    test('DIC is an instance of the DI class', () => {
        expect(DIC).toBeInstanceOf(DI);
    });

    test('Get module1 instance from DIC using the autoloader', () => {
        let mySimpleObject = DIC.get('@functionLiteral');

        expect(mySimpleObject).toBeInstanceOf(Object);
        expect(mySimpleObject.sayHello()).toBe('hello from my functionLiteral');
    });
});
