
import * as types from '../actionTypes';

function formatterReducers(state = {}, action) {
  switch (action.type) {
    case types.PARSE_JSON:
      return { ...state, jsonInput: action.jsonInput };
    default:
      return state;
  }
}

export default formatterReducers;