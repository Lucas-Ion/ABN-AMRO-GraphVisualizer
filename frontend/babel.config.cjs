/* babel.config.cjs */

module.exports = {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: 'current',  // target the current version of Node.js
        },
        modules: 'commonjs'  // transpile ES modules to CommonJS for Node.js compatibility
      }]
    ],
  };
  