import React from 'react';

import styles from './app.css';
import TranslationsTable from '../TranslationsTable';

import { ipcRenderer } from 'electron';

export default function App() {
  ipcRenderer.on('file', console.log);
  const data = {
    translates: [{ key: 3, value: 1 }],
  };
  return (
    <div>
      <h1 className={styles.app}>Hello, world!</h1>
      <TranslationsTable {...data} />
    </div>
  );
}

