// Get the DI Object not a Instance
const DI = require('../src/nodedi').getDic();

const config = require('./config/testconfiguration')();

let DIC;

describe('DI with injected config and autoload is true:', () => {
    beforeEach(() => {
        DIC = new DI(config);
    });

    test('DIC is an instance of the DI class', () => {
        expect(DIC).toBeInstanceOf(DI);
    });

    test('Get Version from DIC Instance from private field', () => {
        expect(DIC.getVersion()).toBe('1.0.0');
    });

    test('test lambda function from configuration file', () => {
        let lambdaFunction = DIC.get('lambdaFunction');
        expect(lambdaFunction()).toBe('hello from function');
    });

    test('test lambda function with corrupt configuration', () => {
        expect(() => { DIC.get('corruptLambdaFunction'); })
            .toThrowError('corruptLambdaFunction has no an executable function in function definition');
    });

    test('Get Param from ServiceConfig', () => {
        let parameter = DIC.get('%simpleParam%');
        expect(parameter).toBe('paramData');
    });

    test('Get invalid Param from ServiceConfig', () => {
        expect(() => { DIC.get('%invalidParamName%'); })
            .toThrowError('Parameter invalidParamName not found in parameter config');
    });

    test('Get exampleObject instance from DIC with injected name param', () => {
        let exampleObject = DIC.get('@exampleObject');
        expect(exampleObject).toBeInstanceOf(Object);
        expect(exampleObject.getName()).toBe('myExampleObject');
    });

    test('Get ModuleB Instance from DIC and execute injected ModuleA and the injected LambdaFunction', () => {
        let moduleB = DIC.get('@moduleB');
        expect(moduleB).toBeInstanceOf(Object);
        expect(moduleB.getName()).toBe('I am moduleB');
        expect(moduleB.getInjectedModuleName()).toBe('I am moduleA');
        expect(moduleB.executeLambdaFunction()).toBe('hello from function');
    });

    test('Get simple ModuleA from DIC (no Instance) and set as not shared', () => {
        let moduleA = DIC.get('moduleA');
        let moduleInstance = new moduleA();
        expect(moduleInstance).toBeInstanceOf(Object);
        expect(moduleInstance.getName()).toBe('I am moduleA');
        expect(DIC.has('moduleA')).toBe(false);
    });

    test('Get simple ModuleA from DIC and set as shared', () => {
        let moduleAshared = DIC.get('moduleAshared');
        let moduleInstance = new moduleAshared();
        expect(moduleInstance).toBeInstanceOf(Object);
        expect(moduleInstance.getName()).toBe('I am moduleA');
        expect(DIC.has('moduleAshared')).toBe(true);

    });

    test('Get a Error if called a invalid Module component', () => {
        expect(() => { DIC.get('invalidModuleEntry'); })
            .toThrowError('can\'t require invalidModuleEntry: fileName or path in service config is invalid');
    });
});
