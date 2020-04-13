import React, {useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Box, Flex, Image} from 'rebass/styled-components';
import ReactPlayer from 'react-player'
import { IdContext } from '../Viewer'
import SketchFabViewer from './SketchFabViewer';
import MetaData from './MetaData';
import watermark from '../assets/watermark.png'
import data from '../data/allLists'



const Pane = styled(Box)`
  height: 100%;
`

const Lightbox = styled(Image)`
  max-height: 75vh;
  width: auto;
  object-fit: contain;
  background-color:white;
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
  opacity: 0.05;
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
  if (props.props==="Museum of Comparative Zoology (MCZ)"){
    return(
      <WatermarkDiv />
    )} else {
      return null
    }
}


const SpecimenPane = () => {
  const specimenId = useContext(IdContext)
  const specimen = data.specimens[specimenId]
  if (specimen.type==="sketchfab"){
    return(
      <PaneWrapper>
          <Box>
            <Watermark props={specimen.metadata.attribution.institution}/>
            <SketchFabViewer url={specimen.resource} />
          </Box>
          <Box sx={{alignSelf:'center', marginTop: '3%'}}>
            <MetaData data={specimen.metadata}/>
          </Box>
      </PaneWrapper>
    )} else if (specimen.type.split("-")[0]==="video"){
    return(
      <PaneWrapper>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <ReactPlayer url={specimen.resource} playing loop/>
          </Box>
          <Box sx={{alignSelf:'center', marginTop: '3%'}}>
            <MetaData data={specimen.metadata}/>
          </Box>
      </PaneWrapper>
    )} else {
    return(
      <PaneWrapper>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <Lightbox src={specimen.resource} alt={specimen.metadata.taxon}/>
          </Box>
          <Box sx={{alignSelf:'center', marginTop: '3%'}}>
            <MetaData data={specimen.metadata}/>
          </Box>
      </PaneWrapper>)}
}

export default SpecimenPane
