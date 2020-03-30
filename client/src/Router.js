import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Password from './Password'
import App from './App'
import { Authed } from './AuthContext'


export default function AuthRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Password />
        </Route>
        <ProtectedRoute path='/lab'>
          <App />
        </ProtectedRoute>
      </Switch>
    </Router>
  )
}


export function ProtectedRoute({ children, ...rest }) {
  const authed = useContext(Authed)
  console.log('here')
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
