import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import axios from 'axios';
import App from './App';
import './index.css';

axios.defaults.baseURL = process.env.REACT_APP_URL || "http://localhost:3500";

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);