import React, {useState} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Box, Flex, System} from 'rebass'
import {Label, Select} from '@rebass/forms'
import styled from 'styled-components'
import SpecimenPane from './components/SpecimenPane'
import Info from './components/Info'
import Tree from './components/Tree'
import db from './data/lookup.json'
import {IDContext} from './data/DataContexts'
import './App.css';



const iconSize = '56px'


const Universe = styled(Box)`
`

const Galaxy = styled(Flex)`
  height:100%;

`
const TreeBox = styled(Box)`
  z-index: 10;
  position: fixed;
  bottom: 50vh;
  right: calc((100vw - ${iconSize})/1.53);
`
const InfoBox = styled(Box)`
  display: block;
  padding: 2% 5%
`




const infoContent = '../data/nodes/5-1-reptiliomorpha.mdx'

const labsList = {
  lab5: '5: Amniota and Sauria',
  lab6: '6: Dinosauria',
  lab7: '7: Reptile Soup',
  lab8: '8: Basal Synapsids',
  lab9: '9: Mammaliaformes, Monotremata, and Metatheria',
  lab10: '10: Eutheria'
}

function App() {
  const [specimen, setSpecimen] = useState('s47epiphyses');
  const value = {specimen, setSpecimen}

  return (
    <IDContext.Provider value={value}>
      <Universe>
        <TreeBox>
          <Tree iconSize={iconSize}/>
        </TreeBox>
        <Galaxy sx={{flexFlow:['column nowrap', 'row nowrap']}}>
          <InfoBox sx={{width:['100%', '35%']}}>
              <Info contentPath={infoContent}/>
          </InfoBox>

              {/*<Box as='form'>
                <Label htmlFor='labChoice'>Lab</Label>
                <Select
                  id='labChoice'
                  name='labChoice'
                  defaultValue='6'
                  choices={labsList}>
                  {Object.entries(labsList).map(([ lab, content ]) => (
                    <option
                      key={lab}>
                      {content}
                    </option>
                  ))}
                </Select>
              </Box>*/}
              <SpecimenPane />

        </Galaxy>
      </Universe>
    </IDContext.Provider>
  );
}

export default withRouter(App);
