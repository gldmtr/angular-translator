'use strict';

const { resolve, sep } = require('path');

const webpackConfig = require('../webpack.config');

const config = {
  isDevelopment: process.env.NODE_ENV === 'development',

  get port() {
    return webpackConfig.devServer.port;
  },

  get indexHtml() {
    if (this.isDevelopment) {
      return `http://localhost:${this.port}`;
    }

    return `file://${resolve(__dirname, '..', 'dist')}${sep}index.html`;
  },
};

module.exports = config;

