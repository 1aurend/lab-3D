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
  padding: 2% 5%;
  display: flex;
  flex-flow: column nowrap;
`

const DropDown = styled(Box)`
  & label{
    margin:10px 0px 4px 0px;
    font-weight:bold;
  }
`

const InfoBox = styled(Box)`
`

const InfoPane = () => {
  const {lab, setLab} = useContext(labContext)
  const {node, setNode} = useContext(nodeContext)
  useEffect (() => {
    setNode('6-0-Archosauria')
  },[lab])

  return(
    <Pane sx={{width:['100%','35%']}}>
      {/*<DropDown as='form'>
        <Label htmlFor='labChoice'>LAB</Label>
        <Select
          id='labChoice'
          value={lab}
          onChange={()=>{setLab()}}>
          {Object.entries(labList).map(([ key, value ]) => (
            <option value={key}>
              {value.title}
            </option>
          ))}
        </Select>
      </DropDown>*/}
      <DropDown as='form'>
        <Label htmlFor='nodeChoice'>NODE</Label>
        <Select
          id='nodeChoice'
          value={node}
          onChange={e=>{setNode(e.target.value)}}>
          {Object.entries(labList[lab].nodes).map(([ key, value ]) => (
            <option value={key}>
              {value.title}
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
