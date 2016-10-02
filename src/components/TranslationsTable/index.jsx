import React, { PropTypes } from 'react';

import styles from './translations-table.css';

export default function TranslationsTable(props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {props.translates.map(t => (
          <tr key={t.key}>
            <td>{t.key}</td>
            <td>{t.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TranslationsTable.propTypes = PropTypes.arrayOf(PropTypes.shape({
  key: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
})).isRequired;

