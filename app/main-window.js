'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const { promisifyAll } = require('bluebird');
const { readFileAsync } = promisifyAll(require('fs'));

class MainWindow extends BrowserWindow {
  constructor(href) {
    super({
      width: 800,
      height: 600,
      devTools: true,
    });
    this.webContents.openDevTools();

    this.loadURL(href);

    ipcMain.on('loadFile', (event, arg) => {
      this.loadFile(arg.path)
        .then(file => event.sender.send('fileLoaded', file));
    });

    console.log(this.webContents);
    app.on('file', (files) => {
      this.loadFile(files[0])
        .then(file => this.webContents.send('file', file));
    });
  }

  loadFile(path) {
    return readFileAsync(path)
      .then(file => file.toString());
  }
}

module.exports = MainWindow;
