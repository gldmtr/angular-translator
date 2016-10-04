import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './translations-table.css';

function TranslationsTable(props) {
  return (
    <table className={styles.table}>
      <thead>
        {(
          () => {
            if (props.translations.length) {
              return (
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              );
            }

            return null;
          }
        )()}
      </thead>
      <tbody>
        {props.translations.map(t => (
          <tr
            key={t.key}
            className={(
              () => {
                switch (t.state) {
                  case 'old': return styles.old;
                  case 'new': return styles.new;
                  default: return '';
                }
              }
            )()}
          >
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
  state: PropTypes.string,
})).isRequired;

function mapStateToProps(state) {
  return {
    translations: state.translations,
  };
}

export default connect(mapStateToProps)(TranslationsTable);

