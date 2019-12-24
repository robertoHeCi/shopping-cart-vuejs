module.exports = {
    // Indicates whether each individual test should be reported during the run
    verbose: true,
    modulePaths: ['.'],
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    collectCoverage: true,
    // collectCoverageFrom: [
    //     "<rootDir>/components/**/*.vue",
    //     "<rootDir>/pages/**/*.vue"
    // ],
    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js?(x)'],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    //  An array of module extensions
    moduleFileExtensions: ['js', 'vue', 'json'],
    moduleNameMapper: {
        '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@/ports/(.*)$': '<rootDir>/src/ports/$1',
        '^@/adapters/(.*)$': '<rootDir>/src/adapters/$1',
        '^@/models/(.*)$': '<rootDir>/src/models/$1',
        '^@/repositories/(.*)$': '<rootDir>/src/repositories/$1',
    },
    transform: {
        '^.+.vue$': 'vue-jest',
        '^.+.js$': 'babel-jest'
    }
}
