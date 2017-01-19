'use strict';

const { app, dialog, Menu } = require('electron');

const menuTemplate = [{
  label: 'File',
  submenu: [{
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    click() {
      const options = {
        properties: ['openFile'],
        filters: [
          { name: 'i18n files', extensions: ['i18n.json'] },
          { name: 'All files', extensions: ['*'] },
        ],
      };
      const result = dialog.showOpenDialog(options);

      if (result) {
        app.emit('load-file', result);
      }
    },
  }, {
    label: 'Merge',
    accelerator: 'CmdOrCtrl+M',
    click() {
      const options = {
        properties: ['openFile'],
        filters: [
          { name: 'i18n files', extensions: ['i18n.json'] },
          { name: 'All files', extensions: ['*'] },
        ],
      };
      const result = dialog.showOpenDialog(options);

      if (result) {
        app.emit('merge-file', result);
      }
    },
  }, {
    label: 'Apply diff',
    accelerator: 'CmdOrCtrl+A',
    click() {
      app.emit('apply-diff');
    },
  }, {
    label: 'Save',
    accelerator: 'CmdOrCtrl+S',
    click() {
      app.emit('save-file');
    },
  }, {
    label: 'Save As',
    accelerator: 'CmdOrCtrl+Shift+S',
    click() {
      const options = {
        properties: ['saveFile'],
        filters: [
          { name: 'i18n files', extensions: ['i18n.json'] },
          { name: 'All files', extensions: ['*'] },
        ],
      };
      const result = dialog.showSaveDialog(options);

      if (result) {
        app.emit('save-file', result);
      }
    },
  }],
}];

module.exports = function buildMenu() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  return menu;
};

