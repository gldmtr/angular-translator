import { combineReducers } from 'redux';

import { UPDATE_FILE } from '../actions/file-actions';

function translations(state = [], action) {
  switch (action.type) {
    case UPDATE_FILE:
      return [
        ...action.data,
      ];
    default:
      return state;
  }
}

export default combineReducers({
  translations,
});
