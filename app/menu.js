'use strict';

const { Menu } = require('electron');

const menuTemplate = [{
  label: 'File',
  submenu: [{
    label: 'Open',
  }],
}];

module.exports = function buildMenu() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  return menu;
};

