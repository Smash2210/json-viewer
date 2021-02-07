import * as types from "../actionTypes";

export function toggleDropDown() {
  return {
    type: types.TOGGLE_NAV
  };
}

export function parseJSON(jsonInput) {
  return {
    type: types.PARSE_JSON,
    jsonInput
  }
}
