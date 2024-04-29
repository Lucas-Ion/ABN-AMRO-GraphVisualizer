/* jest.config.cjs */

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
    '^.+\\.m?js$': 'babel-jest', 
  },
  testEnvironment: 'node', // default test environment is Node.js
  // specify environment overrides for specific test files or suites
  testEnvironmentOptions: {
    '.*views/.*': 'jsdom',
    '.*utils/.*': 'jsdom',
  },
};

