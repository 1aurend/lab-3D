import React, { useState, useRef } from 'react'
import AuthRouter from './Router'

export const Authed = React.createContext()
export const SetAuthed = React.createContext()
export const Jwt = React.createContext()
export const Data = React.createContext()
export const SetData = React.createContext()
export const SetLabLookup = React.createContext()
export const Lookup = React.createContext()


export default function AuthContext() {
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState()
  const [lookup, setLookup] = useState()
  const jwt = useRef()

  return (
    <Authed.Provider value={authed}>
      <SetAuthed.Provider value={setAuthed}>
        <Jwt.Provider value={jwt}>
          <Data.Provider value={data}>
            <SetData.Provider value={setData}>
              <SetLabLookup.Provider value={setLookup}>
                <Lookup.Provider value={lookup}>
                  <AuthRouter />
                </Lookup.Provider>
              </SetLabLookup.Provider>
            </SetData.Provider>
          </Data.Provider>
        </Jwt.Provider>
      </SetAuthed.Provider>
    </Authed.Provider>
  )
}
