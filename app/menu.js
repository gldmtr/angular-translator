'use strict';

const { app, dialog, Menu } = require('electron');

const menuTemplate = [{
  label: 'File',
  submenu: [{
    label: 'Open',
    click() {
      const options = {
        properties: ['openFile'],
        filters: [
          { name: 'i18n files', extensions: ['.i18n.json'] },
          { name: 'All files', extensions: ['*'] },
        ],
      };
      const result = dialog.showOpenDialog(options);

      if (result) {
        app.emit('file', result);
      }
    },
  }],
}];

module.exports = function buildMenu() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  return menu;
};

