import React, { useState } from 'react'
import AuthRouter from './Router'

export const Authed = React.createContext()
export const SetAuthed = React.createContext()


export default function AuthContext() {
  const [authed, setAuthed] = useState(false)

  return (
    <Authed.Provider value={authed}>
      <SetAuthed.Provider value={setAuthed}>
        <AuthRouter />
      </SetAuthed.Provider>
    </Authed.Provider>
  )
}
