import React, {lazy, Suspense, useContext, useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import { Button, Link, Box, Flex, Image } from 'rebass/styled-components'
import { SetIdContext, IdContext, NodeContext, SetHoverContext } from '../Viewer'
import { throttle, debounce } from "lodash";
import Markdown from 'markdown-to-jsx'
import data from '../data/allLists'

const MarkdownWrapper = styled(Box)`
  & h1,h2,h3 {
    font-family:Poppins;
  }
  & h1 {
    font-weight:900;
    font-size: 28px;
    margin-bottom: 5px;

  }
  & h2 {
    font-weight:600;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 18px;
    margin-bottom: auto;
    margin-top: 10px;
  }
  & h3 {
    font-weight:300;
    letter-spacing: 1px;
    font-size: 13px;
    font-style: italic;
    margin: auto;
  }
  & li, p {
    letter-spacing: 0px;
    line-height: 22px;
  }
  & li {
    margin-bottom: 5px;
    list-style-type: square;
  }
  & ul {
    margin-top: 5px;
  }

`


const DropDown = styled(Box)`
  & h1{
    margin:10px 0px 4px 0px;
    font-weight:bold;
  }
`




const Info = ({show, handler}) => {
  const specimen = useContext(IdContext)
  const setSpecimen = useContext(SetIdContext)
  const node = useContext(NodeContext)
  const setHover = useContext(SetHoverContext)
  const debounceHandler = debounce(handler, 500, {'leading':false})
  const [debounceState, setDebounceState] = useState(null)
  useEffect(()=>{
    // console.log("debouncing to: "+debounceState);
    debounceHandler(debounceState)
  },[debounceState])


  const LinkCatcher=(props)=>{
    return(
      <span onMouseEnter={()=>{setDebounceState(true);setHover(props.href.replace('#',''))}} onMouseLeave={()=>{setDebounceState(false)}}>
        <Link sx={{color:'blue'}}
        onClick={()=> {setSpecimen(props.href.replace('#','')); console.log(specimen)}}
        style={{cursor:'pointer'}} >{props.children}</Link>
      </span>
    )
  }

  const components = {
    a:LinkCatcher
  }

  const Content = data.content[node].md
  return useMemo (()=> {
    return (
      <MarkdownWrapper>
        <Markdown options={{overrides:{a:{component:LinkCatcher}}}}>
          {Content}
        </Markdown>
      </MarkdownWrapper>
      )
    }, [node])
}
export default Info;
