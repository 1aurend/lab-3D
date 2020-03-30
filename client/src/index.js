import React from 'react'
import ReactDOM from 'react-dom'
import AuthRouter from './Router'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<AuthRouter />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
