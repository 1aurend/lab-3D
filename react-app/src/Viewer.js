import React, { useContext, useState, useEffect } from 'react'
import { Box, Flex } from 'rebass/styled-components'
import styled, {ThemeProvider} from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import SpecimenPane from './views/SpecimenPane'
import InfoPane from './views/InfoPane'
import Tree from './views/Tree-svg'
import data from './data/allLists'
import theme from './theme'

export const HoverContext = React.createContext()
export const SetHoverContext = React.createContext()
export const IdContext = React.createContext()
export const SetIdContext = React.createContext()
export const NodeContext = React.createContext()
export const SetNodeContext = React.createContext()
export const LabContext = React.createContext()
export const SetLabContext = React.createContext()

const iconSize = '56px'

const Universe = styled(Box)`
  height: 100%;
  background-color: black;
  font-family: 'Cabin', sans-serif;
`

const Galaxy = props =>
  <Flex
    {...props}
    sx={{
      flexFlow:['column-reverse nowrap', 'row nowrap'],
      height: '100vh',
    }}
  />

const TreeBox = styled(Box)`
  z-index: 10;
  position: fixed;
  bottom: 50%;
  right: calc(65% - ${iconSize}/2);
`


export default function App() {
  // const [lab, setLab] = useState(labList.labs[0].id)
  const [lab, setLab] = useState("lab 10")
  const [node, setNode] = useState(Object.keys(data.labs[lab].nodes)[0])
  const [id, setId] = useState(data.nodes[node].default)
  const [hover, setHover] = useState(id)
  console.log("lab is "+lab);
  console.log("node is "+node);
  console.log("id is "+id);


  useEffect (() => {
    setNode(Object.keys(data.labs[lab].nodes)[0])
  },[lab])
  useEffect (() => {
    setId(data.nodes[node].default)
  },[lab])




  return (
    <SetLabContext.Provider value={setLab}>
      <LabContext.Provider value={lab}>
        <SetNodeContext.Provider value={setNode}>
          <NodeContext.Provider value={node}>
            <SetIdContext.Provider value={setId}>
              <IdContext.Provider value={id}>
                <ThemeProvider theme={theme}>
                  <Universe>
                    <TreeBox>
                      <Tree iconSize={iconSize}/>
                    </TreeBox>
                    <Galaxy>
                      <HoverContext.Provider value={hover}>
                        <SetHoverContext.Provider value={setHover}>
                          <InfoPane />
                          <SpecimenPane />
                        </SetHoverContext.Provider>
                      </HoverContext.Provider>
                    </Galaxy>
                  </Universe>
                </ThemeProvider>
              </IdContext.Provider>
            </SetIdContext.Provider>
          </NodeContext.Provider>
        </SetNodeContext.Provider>
      </LabContext.Provider>
    </SetLabContext.Provider>
  )
}
