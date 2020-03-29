import React, {useState, useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Box, Flex, System} from 'rebass/styled-components'
import styled, {ThemeProvider} from 'styled-components'
import SpecimenPane from './components/SpecimenPane'
import InfoPane from './components/InfoPane'
import Tree from './components/Tree-svg'
import labList from './data/labList'
import {idContext, nodeContext, labContext} from './data/DataContexts'
import './App.css';
import theme from './theme'


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

function App() {
  const [lab, setLab] = useState("lab 5");
  const [node, setNode] = useState(Object.keys(labList[lab]["nodes"])[0]);
  const [specimen, setSpecimen] = useState(labList[lab]["default"]);
  useEffect (() => {
    setNode(Object.keys(labList[lab]["nodes"])[0])
  },[lab])
  useEffect (() => {
    setSpecimen(labList[lab]["default"])
  },[lab])

  const idValue = {specimen, setSpecimen}
  const nodeValue = {node, setNode}
  const labValue = {lab, setLab}

  return (
    <ThemeProvider theme={theme}>
      <labContext.Provider value={labValue}>
        <nodeContext.Provider value={nodeValue}>
          <idContext.Provider value={idValue}>
            <Universe>
              <TreeBox>
                <Tree iconSize={iconSize}/>
              </TreeBox>
              <Galaxy sx={{flexFlow:['column nowrap', 'row nowrap']}}>
                <InfoPane />
                <SpecimenPane />
              </Galaxy>
            </Universe>
          </idContext.Provider>
        </nodeContext.Provider>
      </labContext.Provider>
    </ThemeProvider>
  );
}

export default withRouter(App);
