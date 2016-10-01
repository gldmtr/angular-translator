'use strict';

const app = require('./app');
const config = require('./config');
const devServer = require('./dev-server');

if (config.isDevelopment) {
  devServer.init();
}

app.init();

