import React, { useContext, useState, useEffect } from 'react'
import { Lookup } from './AuthContext'
import { Box, Flex } from 'rebass/styled-components'
import styled, {ThemeProvider} from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import SpecimenPane from './views/SpecimenPane'
import InfoPane from './views/InfoPane'
import Tree from './views/Tree-svg'
import labList from './data/labList'
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
`

const Galaxy = styled(Flex)`
  height: 100vh;
`
const TreeBox = styled(Box)`
  z-index: 10;
  position: fixed;
  bottom: 50%;
  right: calc(65% - ${iconSize}/2);
`


export default function App() {
  const lookup = useContext(Lookup)
  const [lab, setLab] = useState("lab 7")
  const [node, setNode] = useState(Object.keys(labList[lab]["nodes"])[0])
  const [id, setId] = useState(labList[lab]["default"])
  const [hover, setHover] = useState(labList[lab]["default"])

  useEffect (() => {
    setNode(Object.keys(labList[lab]["nodes"])[0])
  },[lab])
  useEffect (() => {
    setId(labList[lab]["default"])
  },[lab])


  // console.log(lookup)


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
                    <Galaxy sx={{flexFlow:['column nowrap', 'row nowrap']}}>
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
