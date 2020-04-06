import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Viewer from './Viewer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Viewer />
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
