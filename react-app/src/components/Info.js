import React, {lazy, Suspense, useContext, useState} from 'react';
// import {importMDX} from 'mdx.macro'
import styled from 'styled-components';
import {MDXProvider} from '@mdx-js/react'
import {Link} from 'rebass'
import {IDContext} from '../data/DataContexts';






const Info = (props) => {
  const {specimen, setSpecimen} = useContext(IDContext)

  const LinkCatcher=(props)=>{
    return(
      <Link onClick={()=>ToggleContext()} style={{fontWeight:'bold', cursor:'pointer'}}>{props.children}</Link>
    )
  }
  const ToggleContext = ()=>{
      const options = ['s47epiphyses','s13alligatorfemur']
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

  const Content = lazy(() => import('!babel-loader!mdx-loader!../data/nodes/5-1-reptiliomorpha.mdx'))
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
