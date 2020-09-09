// vue.config.js
const path = require('path');

module.exports = {
  // options...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  outputDir: path.resolve(__dirname, '../dest'),
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
};
