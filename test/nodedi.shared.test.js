// Get the DI Object not a Instance
const DI = require('../src/nodedi').getDic();
// Get shared Instance by default
const SharedDIFromPage1 = require('../src/nodedi');
// Or get a shared Instance by calling getSharedInstance(), is up to you!
const SharedDIFromPage2 = require('../src/nodedi').getSharedInstance();

let DIC1;
let DIC2;

describe('Test interaction with multiple DIC instances for different Services', () => {
    beforeEach(() => {
        DIC1 = new DI();
        DIC2 = new DI();
    });

    test('Isolationen Test: set module in DIC1 should not set in DIC2', () => {
        let object = {file:'test.js'};
        DIC1.set('mySimpleObject', object);
        expect(DIC2.has('mySimpleObject')).toBe(false);
    });
});

describe('Test interaction with Shared DIC Object', () => {
    test('SharedObject Test: set module in DIC1 on one script should set in DIC2 on other script', () => {
        expect(SharedDIFromPage1).toBeInstanceOf(DI);
        expect(SharedDIFromPage2).toBeInstanceOf(DI);

        let object = {file:'test.js'};
        SharedDIFromPage1.set('myNewObject', object);

        expect(SharedDIFromPage2.has('myNewObject')).toBe(true);
    });
});
