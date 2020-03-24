import React, {useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Box, Flex, System} from 'rebass/styled-components';
import {Label, Select} from '@rebass/forms'
import {nodeContext, labContext} from '../data/DataContexts';
import Info from './Info';
import labList from '../data/labList'

const Pane = styled(Box)`
  height: 100%;
  background-color: white;
  padding: 2% 5%
`

const DropDown = styled(Box)`
  margin: 2% 0%
  > label {
    color:'red'
  }
`

const InfoBox = styled(Box)`
  display: flex;
  flex-flow:column;
`

const InfoPane = () => {
  const {node, setNode} = useContext(nodeContext)
  const {lab, setLab} = useContext(labContext)
  const MDXLookup = (key, object) => {

  }
  return(
    <Pane sx={{width:['100%','35%']}}>
      <DropDown as='form'>
        <Label htmlFor='labChoice'>LAB</Label>
        <Select
          id='labChoice'
          value={lab}
          onChange={()=>{setLab()}}>
          {Object.entries(labList).map(([ lab, content ]) => (
            <option>
              {lab}
            </option>
          ))}
        </Select>
      </DropDown>
      <DropDown as='form'>
        <Label htmlFor='nodeChoice'>NODE</Label>
        <Select
          id='nodeChoice'
          value={node}
          onChange={e=>{setNode(e.target.value)}}>
          {Object.entries(labList["5: Amniota and Sauria"]).map(([ node, file ]) => (
            <option>
              {node}
            </option>
          ))}
        </Select>
      </DropDown>
      <InfoBox>
          <Info contentPath={node}/>
      </InfoBox>
    </Pane>
  )
}

export default InfoPane
