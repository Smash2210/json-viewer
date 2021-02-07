import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as ProviderRedux } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import ReduxReducers from "./redux/reducers";

const initialState = {
  core: {
    showDropdown: false
  }
};

const store = createStore(ReduxReducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <ProviderRedux store={store}>
    <Router>
      <App />
    </Router>
  </ProviderRedux>,
  document.getElementById('root')
);
