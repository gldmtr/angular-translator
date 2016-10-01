'use strict';

const { BrowserWindow, ipcMain } = require('electron');
const { promisifyAll } = require('bluebird');
const { readFileAsync } = promisifyAll(require('fs'));


class MainWindow extends BrowserWindow {
  constructor(href) {
    super({ width: 800, height: 600 });

    this.loadURL(href);

    ipcMain.on('loadFile', (event, arg) => {
      this.loadFile(arg.path)
        .then(file => event.sender.send('fileLoaded', file));
    });
  }

  loadFile(path) {
    return readFileAsync(path)
      .then(file => file.toString());
  }
}

module.exports = MainWindow;
