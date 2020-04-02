import React, { useContext, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Password from './Password'
import Viewer from './Viewer'
import Select from './Select'
import { Authed, SetAuthed } from './AuthContext'
import axios from 'axios'


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
  const setAuthed = useContext(SetAuthed)
  const [verifying, setVerifying] = useState(true)
  if (!authed) {
    if (sessionStorage.getItem('token')) {
      const verify = async () => {
        const config = {
          method: 'post',
          url:'/api/refresh',
          type: 'application/json',
          withCredentials: true,
          headers: {
            authorization: sessionStorage.getItem('token')
          }
        }
        try {
          const result = await axios(config)
          if (!result.data) {
            alert('Token verification failed')
          }
          setAuthed(result.data.authed)
          setVerifying(false)
        } catch (err) {
          alert(err)
        }
      }
      verify()
    }
  }
  // grab the lab title from url params to send to server verification route to load lookup
  if (verifying && !authed) {
    return <h2>Loading...</h2>
  }
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
