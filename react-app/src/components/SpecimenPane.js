import React, {useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Box, Flex, System} from 'rebass/styled-components';
import ReactPlayer from 'react-player'
import {idContext} from '../data/DataContexts';
import Viewer from './Viewer';
import MetaData from './MetaData';
import watermark from '../assets/watermark.png'
import db from '../data/lookup.json'

const Pane = styled(Box)`
  height: 100%;
`

const PaneWrapper = ({children}) => {
  return(
    <Pane sx={{width:['100%','65%']}}>
      <Flex sx={{flexFlow:'column nowrap', position:'fixed', width:'inherit',top:'0%', justifyContent:'flex-start', alignItems:'stretch'}}>
      {children}
      </Flex>
    </Pane>
  )
}


const WatermarkDiv = styled.div`
  background-image: url(${watermark});
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: luminosity;
  opacity: 0.04;
  z-index: 5;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events : none;
`

const Watermark = (props) => {
  console.log(props.props);
  if (props.props==="Museum of Comparative Zoology"){
    return(
      <WatermarkDiv />
    )} else {
      return null
    }
}

const SpecimenPane = () => {
  const {specimen, setSpecimen} = useContext(idContext)
  const data = db[specimen]
  if (data.type==="sketchfab"){
    return(
      <PaneWrapper>
          <Box>
            <Watermark props={data.metadata.attribution.institution}/>
            <Viewer url={data.resource} />
          </Box>
          <Box sx={{alignSelf:'center', marginTop: '3%'}}>
            <MetaData data={data.metadata}/>
          </Box>
      </PaneWrapper>
    )} else if (data.type==="video"){
    return(
      <PaneWrapper>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <ReactPlayer url={data.resource} playing loop/>
          </Box>
          <Box sx={{alignSelf:'center', marginTop: '3%'}}>
            <MetaData data={data.metadata}/>
          </Box>
      </PaneWrapper>
    )} else if (data.type==="image"){
    return(
      <PaneWrapper>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <img src={data.resource} alt={data.metadata.taxon}/>
          </Box>
          <Box sx={{alignSelf:'center', marginTop: '3%'}}>
            <MetaData data={data.metadata}/>
          </Box>
      </PaneWrapper>)}
}

export default SpecimenPane
