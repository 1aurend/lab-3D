import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Box, Flex, System} from 'rebass/styled-components';
import {Label, Select} from '@rebass/forms'
import { LabContext, SetLabContext, NodeContext, SetNodeContext } from '../Viewer'
import Info from './Info';
import data from '../data/allLists'
import Thumb from './Thumb'



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
  height: 100%;
  overflow: auto;
`

const InfoPane = () => {
  const lab = useContext(LabContext)
  const setLab = useContext(SetLabContext)
  const node = useContext(NodeContext)
  const setNode = useContext(SetNodeContext)
  const [show, setShow] = useState(false)
  return(
    <Pane sx={{width:['100%','35%']}}>

      <DropDown as='form'>
        <Label htmlFor='labChoice'>LAB</Label>
        <Select
          id='labChoice'
          value={lab}
          onChange={e=>{setLab(e.target.value)}}>
          {Object.entries(data.labs).map(item=>(
            <option value={item[0]}>
              {item[1].title}
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
          {Object.entries(data.labs[lab].nodes).map(item=>(
            <option value={item[0]}>
              {item[1].title}
            </option>
          ))}
        </Select>
      </DropDown>
      <InfoBox>
          <Info show={show} handler={setShow}/>
          <Thumb show={show}/>
      </InfoBox>
    </Pane>
  )
}

export default InfoPane
