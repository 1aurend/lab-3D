import React from 'react';
import tree5 from './data/trees/tree5.svg'
import {Box, Flex, System} from 'rebass'
import {Label, Select} from '@rebass/forms'
import styled from 'styled-components'
import { ModalProvider } from 'styled-react-modal'
import Viewer from './components/Viewer'
import Info from './components/Info'
import './App.css';

const Universe = styled(Box)`
  padding: 3%
`

const Galaxy = styled(Flex)`
  height: 100%;
`

const TreeBox = styled(Box)`

`
const InfoBox = styled(Box)`
  display: block;
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
  return (
      <Universe>
        <Galaxy sx={{flexFlow:['column nowrap', 'row nowrap']}}>
          <InfoBox sx={{width:['100%', '50%']}}>
            <ModalProvider>
              <Info contentPath={infoContent}/>
            </ModalProvider>
          </InfoBox>
          <Flex sx={{width:['100%','50%'], flexFlow:'column nowrap'}}>
            <Box as='form'>
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
            </Box>
            <Viewer url='10e8b5690b6e47c98f22e16103780b0c'/>
            <TreeBox width={[1,1/2]}>

            </TreeBox>
          </Flex>
        </Galaxy>
      </Universe>
  );
}

export default App;
