import React, { useContext } from 'react'
import { Lookup } from './AuthContext'
import {
  Box,
  Flex,
  Heading,
} from 'rebass/styled-components'
import styled from 'styled-components'
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
  const lookup = useContext(Lookup)
  console.log(lookup)

  return (
    <Universe>
      <Galaxy>
        <Panel backgroundColor='black'>
          <Box>
            <Heading color='#61dafb' fontSize={4} fontFamily='sans-serif' mb='10px'>
              Success! Here we'd show the lab...
            </Heading>
          </Box>
        </Panel>
      </Galaxy>
    </Universe>
  )
}
