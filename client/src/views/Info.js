import React, {lazy, Suspense, useContext, useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import { Link, Box, Flex, Image } from 'rebass/styled-components'
import {MDXProvider} from '@mdx-js/react'
import { SetIdContext, IdContext, NodeContext } from '../Viewer'


const Info = ({show, handler}) => {
  const specimen = useContext(IdContext)
  const setSpecimen = useContext(SetIdContext)
  const node = useContext(NodeContext)

  const LinkCatcher=(props)=>{
    return(
      <>
        <Link sx={{color:'blue'}}
        onClick={()=> {setSpecimen(props.href); console.log(specimen)}}
        onMouseEnter={()=>{handler(true);console.log('mouse entered')}}
        onMouseLeave={()=>{console.log('mouse left')}}
        style={{fontWeight:'bold', cursor:'pointer'}} >{props.children}</Link>
      </>
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
