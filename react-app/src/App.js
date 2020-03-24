import React, {useState} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Box, Flex, System} from 'rebass/styled-components'
import styled, {ThemeProvider} from 'styled-components'
import SpecimenPane from './components/SpecimenPane'
import InfoPane from './components/InfoPane'
import Tree from './components/Tree'
import db from './data/lookup.json'
import {idContext, nodeContext, labContext} from './data/DataContexts'
import './App.css';
import theme from './theme'


const iconSize = '56px'

const Universe = styled(Box)`
  height: 100%;
`

const Galaxy = styled(Flex)`
  height: 100%;
`
const TreeBox = styled(Box)`
  z-index: 10;
  position: fixed;
  bottom: 50%;
  right: calc(65% - ${iconSize}/2);
`

function App() {
  const [specimen, setSpecimen] = useState("47epiphyses");
  const [lab, setLab] = useState("lab 5");
  const [node, setNode] = useState("5-1-Reptiliomorpha");
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
