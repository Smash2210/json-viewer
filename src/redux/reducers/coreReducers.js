
import * as types from '../actionTypes';

function coreReducers(state = {}, action) {
  switch (action.type) {
    case types.TOGGLE_NAV:
      return { ...state, showDropdown: state.showDropdown !== undefined ? !state.showDropdown : false };
    default:
      return state;
  }
}

export default coreReducers;