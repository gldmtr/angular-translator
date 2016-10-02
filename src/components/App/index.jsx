import React from 'react';

import styles from './app.css';
import TranslationsTable from '../TranslationsTable';

export default function App() {
  return (
    <div>
      <h1 className={styles.app}>Hello, world!</h1>
      <TranslationsTable />
    </div>
  );
}

