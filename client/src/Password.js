import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Button
} from 'rebass/styled-components'
import { Input } from '@rebass/forms'
import styled from 'styled-components'
import axios from 'axios'

const Universe = styled(Box)`
  height: 100%;
`

const Galaxy = styled(Flex)`
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const PassEntry = styled(Flex)`
  border: 5px solid black;
  border-radius: 10px;
  position: fixed;
  min-height: 300px;
  min-width: 600px;
  justify-content: center;
  padding-top: 75px;
`


export default function Password() {
  const [input, setInput] = useState('')

  const getAuth = () => {

  }

  return (
    <Universe>
      <Galaxy>
        <PassEntry backgroundColor='black'>
          <Box>
            <Heading color='#61dafb' fontSize={4} fontFamily='sans-serif' mb='10px'>
              Enter the password to continue
            </Heading>
            <Input
              id='password'
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='password'
              color='white'
            />
          <Flex justifyContent='center' mt='10px'>
              <Box>
                <Button bg='#61dafb' color='white' onClick={getAuth}>
                  Go!
                </Button>
              </Box>
            </Flex>
          </Box>
        </PassEntry>
      </Galaxy>
    </Universe>

  )
}
