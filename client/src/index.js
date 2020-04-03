import React from 'react'
import ReactDOM from 'react-dom'
import AuthContext from './AuthContext'
import * as serviceWorker from './serviceWorker'
import './index.css';

const script = document.createElement('script');
script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.7.1.js';
document.body.appendChild(script)
ReactDOM.render(<AuthContext />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
