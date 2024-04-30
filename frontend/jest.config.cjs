/* jest.config.cjs */

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
    '^.+\\.m?js$': 'babel-jest', 
  },
  testEnvironment: 'node', // setting the defalt test environment to Node.js
  
  testEnvironmentOptions: {
    '.*views/.*': 'jsdom',
    '.*utils/.*': 'jsdom',
  },
};

