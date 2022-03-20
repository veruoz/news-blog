import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from "react-redux";

import store from "./store";

import './index.css';
import './styles/semantic.css'

render(
  <React.StrictMode>
  <Provider store={store}>
      <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
