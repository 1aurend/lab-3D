import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Password from './Password'


export default function AuthRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Password />
        </Route>
      </Switch>
    </Router>
  )
}
