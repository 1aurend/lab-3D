import React, {useContext, useMemo, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Box, Image } from 'rebass/styled-components'
import { HoverContext } from '../Viewer'
import db from '../data/lookup.json'

const imgSz = 128

const ThumbBox = styled(Box)`
  position: fixed;
  z-index: 50;
  background-color: none;
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
    // console.log(data.resource);
    if (data.type==="sketchfab") {
      fetch("https://api.sketchfab.com/v3/models/"+data.resource.split("-").slice(-1))
      .then(res => res.json())
      .then(body => body.thumbnails.images.find(item=>item.width>=0.5*imgSz && item.width<=2*imgSz))
      .then(image => setThumbnail(image.url))
      .catch(console.log)
    } else if (data.type==="image") {
      fetch(data.resource)
      .then(function(response) {
        return response.blob()})
      .then(function(blob) {
        const imgURL = URL.createObjectURL(blob)
        setThumbnail(imgURL)
      })
    } else if (data.type==="video-wikicommons") {
      const path = new URL(data.resource)
      const pathArray = path.pathname.split("/")
      const jpgURL = path.origin+pathArray.slice(0,3).join("/")+"/thumb/"+pathArray.slice(3).join("/")+"/200px--"+pathArray.slice(-1)[0]+".jpg"
      fetch(jpgURL)
      .then(function(response) {
        return response.blob()})
      .then(function(blob) {
        const imgURL = URL.createObjectURL(blob)
        setThumbnail(imgURL)
      })
    } else if (data.type==="video-digimorph") {
      const path = data.resource
      const jpgURL = path.split("/").slice(0,-1).join("/")+"/specimen.jpg"
      setThumbnail(jpgURL)
    }
  },[hover])
  if (show){
    return (
      <ThumbBox sx={{
        top:position.posY+5,
        left:position.posX+5
      }}>
        <Image sx={{borderRadius:"8px",width:imgSz, boxShadow:"0px 3px 8px #A9A9A9", backgroundColor:"white"}} src={thumbnail}/>
      </ThumbBox>
    )
  } else {
    return null
  }
}

export default Thumb;
