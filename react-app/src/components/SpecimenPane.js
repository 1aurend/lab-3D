import React, {useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Box, Flex, System} from 'rebass';
import {IDContext} from '../data/DataContexts';
import Viewer from './Viewer';
import MetaData from './MetaData';
import db from '../data/lookup.json'

const ViewerBox = styled(Box)`
  display: block;
  padding: 5%
`
const MetaBox = styled(Box)`
  display: block;
  padding: 5%;
  align-self: center;
`

const SpecimenPane = () => {
  const {specimen, setSpecimen} = useContext(IDContext)
  const data = db[specimen]
  return(
    <Box sx={{width:['100%','65%'], backgroundColor:'black'}}>
      <Flex sx={{flexFlow:'column nowrap', position:'fixed', width:'inherit',top:'2%', justifyContent:'flex-start', alignItems:'stretch'}}>
        <ViewerBox>
          <Viewer url={data.resource} />
        </ViewerBox>
        <MetaBox>
          <MetaData data={data.metadata}/>
        </MetaBox>
      </Flex>
    </Box>
  )
}

export default SpecimenPane
