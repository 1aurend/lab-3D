import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Password from './Password'
import Viewer from './Viewer'
import Select from './Select'
import { Authed } from './AuthContext'


export default function AuthRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Password />
        </Route>
        <ProtectedRoute exact path='/lab'>
          <Select />
        </ProtectedRoute>
        <ProtectedRoute path='/lab/:title/:node'>
          <Viewer />
        </ProtectedRoute>
      </Switch>
    </Router>
  )
}


export function ProtectedRoute({ children, ...rest }) {
  const authed = useContext(Authed)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
