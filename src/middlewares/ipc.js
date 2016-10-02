import { ipcRenderer } from 'electron';

import { updateFile } from '../actions/file-actions';

export default function({ dispatch }) {
  ipcRenderer.on('file-loaded', (event, translations) => {
    console.log(translations);
    dispatch(updateFile(translations));
  });
}
