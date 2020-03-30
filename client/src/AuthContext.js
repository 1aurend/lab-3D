import React, { useState, useRef } from 'react'
import AuthRouter from './Router'

export const Authed = React.createContext()
export const SetAuthed = React.createContext()
export const Jwt = React.createContext()


export default function AuthContext() {
  const [authed, setAuthed] = useState(false)
  const jwt = useRef()

  return (
    <Authed.Provider value={authed}>
      <SetAuthed.Provider value={setAuthed}>
        <Jwt.Provider value={jwt}>
          <AuthRouter />
        </Jwt.Provider>
      </SetAuthed.Provider>
    </Authed.Provider>
  )
}
