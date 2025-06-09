const path = require('path');

module.exports = {
  entry: {
    app: './js/deepseek.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/deepseek.js',
  },
};
