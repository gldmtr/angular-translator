'use strict';

const { differenceBy, unionBy, sortBy } = require('lodash');
const { app, BrowserWindow } = require('electron');
const { promisifyAll } = require('bluebird');
const { readFileAsync, writeFileAsync } = promisifyAll(require('fs'));

const { isDevelopment } = require('./config');
const { parse, stringify } = require('./i18n');

class MainWindow extends BrowserWindow {
  constructor(href) {
    super({
      width: 800,
      height: 600,
      devTools: true,
    });

    if (isDevelopment) {
      this.webContents.openDevTools();
    }

    this.loadURL(href);

    app.on('load-file', (files) => {
      this.filePath = files[0];

      this.loadFile(this.filePath)
        .then(file => this.webContents.send('file-loaded', file));
    });

    app.on('merge-file', (files) => {
      this.mergeFile(files[0])
        .then(file => this.webContents.send('file-loaded', file));
    });

    app.on('save-file', (file) => {
      if (!this.file) {
        return;
      }

      if (file) {
        this.filePath = file;
      }

      this.saveFile(this.filePath)
        .then(() => this.webContents.send('file-loaded', this.file));
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

  saveFile(path) {
    this.file = this.file.map(item => Object.assign({}, item, { state: 'present' }));

    const json = stringify(this.file);

    return writeFileAsync(path, json);
  }
}

module.exports = MainWindow;

