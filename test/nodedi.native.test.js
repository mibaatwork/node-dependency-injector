// Get the DI Object not a Instance
const DI = require('../src/nodedi').getInstance();

let DIC;

describe('Native node.js modules', () => {
    beforeEach(() => {
        DIC = DI;
    });

    test('Get node core component if autoload ist active', () => {
        let config = {autoload: true};
        DIC.setConfig(config);

        let fs = DIC.get('fs');
        let jsonData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

        expect(jsonData.name).toBe('node-dependency-injector');
    });

    test('Get error if native Module can not loaded', () => {
        let config = {autoload: true};
        DIC.setConfig(config);

        expect(() => { DIC.get('not-Found-Module'); })
            .toThrowError('can\'t require not-Found-Module as native node module');
    });
});
