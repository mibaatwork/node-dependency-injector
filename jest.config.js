module.exports = {
    bail: true,
    verbose: true,
    testRegex: "tests/.*\\.(js)$",
    collectCoverage: true,
    coverageReporters: ["html"],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    }
};
