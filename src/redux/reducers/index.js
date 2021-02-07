import { combineReducers } from "redux";
import core from './coreReducers';
import formatter from "./formatterReducers";

export default combineReducers({
  core,
  formatter
});