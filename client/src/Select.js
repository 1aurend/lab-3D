import React, { useContext, useState, useEffect, useRef } from 'react'
import { Jwt, Data, SetLabLookup } from './AuthContext'
import {
  Box,
  Flex,
  Heading,
} from 'rebass/styled-components'
import { Select } from '@rebass/forms'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const Universe = styled(Box)`
  height: 100%;
`

const Galaxy = styled(Flex)`
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const Panel = styled(Flex)`
  border: 5px solid black;
  border-radius: 10px;
  position: fixed;
  min-height: 300px;
  min-width: 600px;
  justify-content: center;
  padding-top: 75px;
`


export default function App() {
  const jwt = useContext(Jwt)
  const data = useContext(Data)
  const setLabLookup = useContext(SetLabLookup)
  const [loaded, setLoaded] = useState(false)
  const redirectURL = useRef()
  const history = useHistory()

  const onSelect = async (e) => {
    const lab = data.filter( lab => lab.title === e.target.value)[0]
    const node = Object.keys(lab.nodes)[0]
    redirectURL.current = `/lab/${lab.title}/${node}`

    const config = {
      method: 'post',
      url:'/api/load',
      data: {lab: lab.title},
      type: 'application/json',
      withCredentials: true,
      headers: {
        authorization: jwt.current
      }
    }
    try {
      const result = await axios(config)
      if (!result.data) {
        alert('Failed to load. Please try again.')
      }
      setLabLookup(result.data.db)
      setLoaded(true)
    } catch (err) {
      alert(err)
    }

  }

  useEffect(() => {
    if (loaded) {
      history.push(redirectURL.current)
    }
  }, [loaded, history])

  return (
    <Universe>
      <Galaxy>
        <Panel backgroundColor='black'>
          <Box>
            <Heading color='#61dafb' fontSize={4} fontFamily='sans-serif' mb='10px'>
              Choose a Lab to view
            </Heading>
            <Select
              id='lab'
              onChange={onSelect}
              defaultValue='-----'
              color='white'
            >
              <option
                key={0}>
                -----
              </option>
              {Object.keys(data).map((lab, i) => (
                <option
                  key={i+1}>
                  {data[lab].title}
                </option>
              ))}
            </Select>
          </Box>
        </Panel>
      </Galaxy>
    </Universe>
  )
}
