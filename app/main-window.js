'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const { promisifyAll } = require('bluebird');
const { readFileAsync } = promisifyAll(require('fs'));

const { parse } = require('./i18n');

class MainWindow extends BrowserWindow {
  constructor(href) {
    super({
      width: 800,
      height: 600,
      devTools: true,
    });
    this.webContents.openDevTools();

    this.loadURL(href);

    app.on('load-file', (files) => {
      this.loadFile(files[0])
        .then(file => this.webContents.send('file-loaded', file));
    });
  }

  loadFile(path) {
    return readFileAsync(path)
      .then(file => file.toString())
      .then(parse)
      .then((data) => {
        this.file = data;

        return data;
      });
  }
}

module.exports = MainWindow;
