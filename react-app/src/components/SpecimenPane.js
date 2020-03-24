import React, {useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Box, Flex, System} from 'rebass/styled-components';
import {idContext} from '../data/DataContexts';
import Viewer from './Viewer';
import MetaData from './MetaData';
import db from '../data/lookup.json'

const Pane = styled(Box)`
  height: 100%;
`

const ViewerBox = styled(Box)`
  display: block;
`
const MetaBox = styled(Box)`
  display: block;
  padding: 5%;
  align-self: center;
`

const SpecimenPane = () => {
  const {specimen, setSpecimen} = useContext(idContext)
  const data = db[specimen]
  return(
    <Pane sx={{width:['100%','65%']}}>
      <Flex sx={{flexFlow:'column nowrap', position:'fixed', width:'inherit',top:'0%', justifyContent:'flex-start', alignItems:'stretch'}}>
        <ViewerBox>
          <Viewer url={data.resource} />
        </ViewerBox>
        <MetaBox>
          <MetaData data={data.metadata}/>
        </MetaBox>
      </Flex>
    </Pane>
  )
}

export default SpecimenPane
