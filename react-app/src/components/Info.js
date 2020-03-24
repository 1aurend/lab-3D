import React, {lazy, Suspense, useContext, useState} from 'react';
import styled from 'styled-components';
import { Link, Box, Flex } from 'rebass/styled-components'
import {MDXProvider} from '@mdx-js/react'
import {idContext, nodeContext} from '../data/DataContexts';


const Info = (props) => {
  const {specimen, setSpecimen} = useContext(idContext)
  const {node, setNode} = useContext(nodeContext)

// <strong onClick={()=>toggleContext()}

  const LinkCatcher=(props)=>{
    return(
      <Link sx={{color:'blue'}} onClick={()=>setSpecimen(props.href)} style={{fontWeight:'bold', cursor:'pointer'}} >{props.children}</Link>
    )
  }

  const toggleContext = ()=>{
      const options = ['47epiphyses','13alligatorfemur']
      if (specimen===options[0]){
        setSpecimen(options[1])
        console.log('set to ' + specimen);
      } else {
        setSpecimen(options[0])
        console.log('set to ' + specimen);
      }
  }

  const components = {
    a:LinkCatcher
  }

  const Content = lazy(() => import('!babel-loader!mdx-loader!'+'../data/nodes/'+node+'.mdx'))
  // const Content = lazy(() => importMDX('../data/nodes/5-1-reptiliomorpha.mdx'))
  return(
      <MDXProvider components={components}>
        <Suspense fallback={<div>Loading...</div>}>
          <Content />
        </Suspense>
      </MDXProvider>
    )
}

export default Info;
