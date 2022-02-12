/* eslint-disable indent */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './utils/i18n';
import App from './js/App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
  // eslint-disable-next-line comma-dangle
  document.getElementById('root')
);
