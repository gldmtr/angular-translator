'use strict';

const { app } = require('electron');

const config = require('./config');
const buildMenu = require('./menu');
const MainWindow = require('./main-window');

const angularTranslator = {
  init() {
    this.mainWindow = null;

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('ready', () => {
      buildMenu();
      this.mainWindow = new MainWindow(config.indexHtml);
    });
  },
};

module.exports = angularTranslator;

