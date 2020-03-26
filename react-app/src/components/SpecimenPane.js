import React, {useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Box, Flex, Image} from 'rebass/styled-components';
import ReactPlayer from 'react-player'
import {idContext} from '../data/DataContexts';
import Viewer from './Viewer';
import MetaData from './MetaData';
import watermark from '../assets/watermark.png'
import db from '../data/lookup.json'


const Pane = styled(Box)`
  height: 100%;
`

const Lightbox = styled(Image)`
  height: 100%;
  width: 100%;
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

let lte = {"specimens": [
  {
    "id": "#2_protosuchuswhole",
    "type": "sketchfab",
    "resource": "a0e89662ad8a4902999ac0d5df640a0e",
    "metadata": {
      "taxon": "Protosuchus",
      "description": "whole",
      "attribution": {
        "institution": "Museum of Comparative Zoology (MCZ)",
        "people": "PF-L",
        "origin": "https://sketchfab.com/3d-models/2-protosuchus-a0e89662ad8a4902999ac0d5df640a0e"
      }
    }
  },
  {
    "id": "#3_alligatormississipiensisskull",
    "type": "sketchfab",
    "resource": "dc8ef92c76ee407b89761eed76871afd",
    "metadata": {
      "taxon": "Alligator mississipiensis",
      "description": "skull",
      "attribution": {
        "institution": "Museum of Comparative Zoology (MCZ)",
        "people": "PF-L",
        "origin": "https://sketchfab.com/3d-models/3-alligator-skull-dc8ef92c76ee407b89761eed76871afd"
      }
    }
  }
]}

const SpecimenPane = () => {
  const {specimen, setSpecimen} = useContext(idContext)
  const data = db.specimens.find(object => object.id==specimen)
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
    )} else {
    return(
      <PaneWrapper>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <Lightbox src={data.resource} alt={data.metadata.taxon}/>
          </Box>
          <Box sx={{alignSelf:'center', marginTop: '3%'}}>
            <MetaData data={data.metadata}/>
          </Box>
      </PaneWrapper>)}
}

export default SpecimenPane
