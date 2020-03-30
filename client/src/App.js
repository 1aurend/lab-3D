import React, { useContext } from 'react'
import { Jwt } from './AuthContext'


export default function App() {
  const jwt = useContext(Jwt)
  console.log(jwt.current)
  return <h2>Made it!</h2>
}
