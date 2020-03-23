import React, {lazy, Suspense} from 'react';
import {Box, Flex} from 'rebass'

import {importMDX} from 'mdx.macro'
import styled from 'styled-components';
import Tree from './Tree'

const TreeBox = styled(Box)`
  width: 48px;
  display: inline;
  position: relative;
`


const Info = (props) => {
  const Content = lazy(() => importMDX('../data/nodes/5-1-reptiliomorpha.mdx'))

  return(
    <>
    <TreeBox>
      <Tree />
    </TreeBox>
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </>
    )
}

export default Info;
