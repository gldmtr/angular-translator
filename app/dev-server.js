'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config');

function init() {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
  }).listen(webpackConfig.devServer.port || 3000, 'localhost');
}

module.exports = {
  init,
};

