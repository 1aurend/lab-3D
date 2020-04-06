import React, {lazy, Suspense, useContext, useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import { Button, Link, Box, Flex, Image } from 'rebass/styled-components'
import {MDXProvider} from '@mdx-js/react'
import { SetIdContext, IdContext, NodeContext, SetHoverContext } from '../Viewer'
import { throttle, debounce } from "lodash";



const Info = ({show, handler}) => {
  const specimen = useContext(IdContext)
  const setSpecimen = useContext(SetIdContext)
  const node = useContext(NodeContext)
  const setHover = useContext(SetHoverContext)

  const LinkCatcher=(props)=>{
    return(
      <span onMouseEnter={()=>{handler(true);setHover(props.href)}} onMouseLeave={()=>{debounce(handler(false),100)}}>
        <Link sx={{color:'blue'}}
        onClick={()=> {setSpecimen(props.href); console.log(specimen)}}
        style={{fontWeight:'bold', cursor:'pointer'}} >{props.children}</Link>
      </span>
    )
  }

  const components = {
    a:LinkCatcher
  }

  const Content = lazy(() => import('!babel-loader!mdx-loader!'+'../data/nodes/'+node+'.mdx'))
  // const Content = lazy(() => importMDX('../data/nodes/5-1-reptiliomorpha.mdx'))
  return useMemo (()=> {
    return (
      <MDXProvider components={components}>
        <Suspense fallback={<div>Loading...</div>}>
          <Content />
        </Suspense>
      </MDXProvider>
      )
    }, [node])
}

export default Info;


// ()=>setId(props.href)
