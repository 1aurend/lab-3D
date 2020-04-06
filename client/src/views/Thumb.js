import React, {useContext, useMemo, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Box, Image } from 'rebass/styled-components'
import { HoverContext } from '../Viewer'
import db from '../data/lookup.json'



const ThumbBox = styled(Box)`
  position: fixed;
  z-index: 50;
  background-color: none;
  height: 128px;
  width: 256px;
`


const Thumb = (props) => {
  const hover = useContext(HoverContext)
  const show = props.show
  const [position, setPosition] = useState({posX:null, posY:null})
  const [thumbnail, setThumbnail] = useState(null)
  const getMousePosition = e => {
    setPosition({posX:e.clientX,posY:e.clientY})
  }
  useEffect(()=>{
    window.addEventListener("mousemove",getMousePosition);
    return()=>window.removeEventListener("mousemove",getMousePosition);
    },[show])
  useMemo(()=>{
    const data = db.specimens.find(object => object.id==hover);
    console.log(data.resource);
    if (data.type==="sketchfab") {
      fetch("https://api.sketchfab.com/v3/models/"+data.resource)
      .then(res => res.json())
      .then(body => body.thumbnails.images.find(item=>item.width==256))
      .then(image => setThumbnail(image.url))
      .catch(console.log)
    } else if (data.type==="image") {
      setThumbnail(data.resource)
    }
  },[hover])
  console.log("url is "+thumbnail);
  if (show){
    return (
      <ThumbBox sx={{
        top:position.posY,
        left:position.posX
      }}>
        <Image src={thumbnail}/>
      </ThumbBox>
    )
  } else {
    return null
  }
}

export default Thumb;
