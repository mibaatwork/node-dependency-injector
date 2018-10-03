// Get the DI Object not a Instance
const DI = require('../src/nodedi').getDic();

let DIC;

describe('DI without injected config:', () => {
    beforeEach(() => {
        DIC = new DI();
    });

    test('DIC is an instance of the DI class', () => {
        expect(DIC).toBeInstanceOf(DI);
    });

    test('Autoload is set to false by default', () => {
        expect(DIC.getConfig().autoload).toBe(false);
    });

    test('get autoload state from config by using getConfigKey', () => {
        let config = {autoload: true};
        DIC.setConfig(config);

        expect(DIC.getConfigKey('autoload')).toBe(true);
    });

    test('Check non existing Object in DIC', () => {
        expect(DIC.has('myNextObjectName')).toBe(false);
    });

    test('Set resource in DIC and check existing object in DIC', () => {
        let object = {data: 'testString'};
        DIC.set('mySimpleObject', object);

        expect(DIC.has('mySimpleObject')).toBe(true);
    });

    test('Get resource from DIC and check property of the object', () => {
        let object = {file:'test.js'};
        DIC.set('myNewObject', object);

        expect(DIC.get('myNewObject')).toHaveProperty('file', 'test.js');
    });

    test('Get undefined if resource is not set and aotoloader is false', () => {
        expect(DIC.getConfigKey('autoload')).toBe(false);
        expect(DIC.get('nonExistingObjects')).toBeUndefined()
    });
});
