'use strict';

const { differenceBy, unionBy, sortBy } = require('lodash');
const { app, BrowserWindow } = require('electron');
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

    app.on('merge-file', (files) => {
      this.mergeFile(files[0])
        .then(file => this.webContents.send('file-loaded', file));
    });
  }

  loadFile(path) {
    return readFileAsync(path)
      .then(file => file.toString())
      .then(parse)
      .map(item => Object.assign({}, item, { state: 'present' }))
      .then((data) => {
        this.file = sortBy(data, 'key');

        return this.file;
      });
  }

  mergeFile(path) {
    return readFileAsync(path)
      .then(file => file.toString())
      .then(parse)
      .map(item => Object.assign({}, item, { state: 'new' }))
      .then((newItems) => {
        const old = differenceBy(this.file, newItems, 'key')
          .map(item => Object.assign({}, item, { state: 'old' }));

        this.file = sortBy(unionBy(old, this.file, newItems, 'key'), 'key');

        return this.file;
      });
  }
}

module.exports = MainWindow;
