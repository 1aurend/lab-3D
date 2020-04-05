import React, {useMemo, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Box, Image } from 'rebass/styled-components'

const ThumbBox = styled(Box)`
  position: fixed;
  z-index: 50;
  background-color: red;
  height: 200px;
  width: 200px;
`


const Thumb = (props) => {
  const show = props.show
  const [position, setPosition] = useState({posX:null, posY:null})
  const getMousePosition = e => {
    setPosition({posX:e.clientX,posY:e.clientY})
  }
  useEffect(()=>{
    window.addEventListener("mousemove",getMousePosition);
    return()=>window.removeEventListener("mousemove",getMousePosition);
    },[show])
  if (show){
    return (
      <ThumbBox sx={{
        top:position.posY,
        left:position.posX
      }}>
        <h2>heyo</h2>
        {/*<Image src={props.src} alt={"alt goes here"}
        />*/}
      </ThumbBox>
    )
  } else {
    return null
  }
}

export default Thumb;
