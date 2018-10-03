let testModuleFolder = '../test/object-examples/';

module.exports = () => {
    return {
        autoload: true,
        parameters: {
            'module2.config': {text:'hello world'},
            'exampleObject.name': 'myExampleObject',
            'simpleParam': 'paramData'
        },
        functions:{
            'lambdaFunction': () => {return 'hello from function'},
            'corruptLambdaFunction': 'corruptData'
        },
        services : {
            'functionLiteral': {
                fileName: testModuleFolder + 'functionLiteral',
                args: [],
                shared: true
            },
            'exampleObject': {
                fileName: testModuleFolder + 'exampleObject',
                args: ['%exampleObject.name%'],
                shared: true
            },
            'invalidExampleObject': {
                fileName: testModuleFolder + 'exampleObject',
                args: ['%invalidParamName%'],
                shared: true
            },
            'moduleA': {
                fileName: testModuleFolder + 'moduleA',
                args: []
            },
            'moduleAshared': {
                fileName: testModuleFolder + 'moduleA',
                args: [],
                shared: true
            },
            'moduleB': {
                fileName: testModuleFolder + 'moduleB',
                args: ['lambdaFunction','@moduleA']
            },
            'invalidModuleEntry': {
                arg: ["invalidEntry"]
            }
        }
    };
};
