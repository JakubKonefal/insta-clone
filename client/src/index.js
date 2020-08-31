import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
