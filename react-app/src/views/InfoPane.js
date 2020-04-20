import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Box, Flex, System} from 'rebass/styled-components';
import {Label, Select} from '@rebass/forms'
import { LabContext, SetLabContext, NodeContext, SetNodeContext } from '../Viewer'
import Info from './Info';
import data from '../data/allLists'
import Thumb from './Thumb'


const Pane = props =>
  <Box
    {...props}
    sx={{
      padding: '2% 5%',
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
      backgroundColor: 'white',
      width:['100%','35%'],
      maxHeight:['55%','100%'],
      minHeight:['55%','100%']
    }}
  />


const DropDown = styled(Box)`
  & label {
    margin:10px 0px 4px 0px;
    font-family: Poppins;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 15px;
    margin-bottom: auto;
  }
  & select {
    letter-spacing: 0.5px;
    font-size: 14px;
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
    <Pane>

      <DropDown as='form'>
        <Label htmlFor='labChoice'>LAB</Label>
        <Select
          id='labChoice'
          value={lab}
          onChange={e=>{setLab(e.target.value)}}>
          {Object.entries(data.labs)
            .sort((a, b) => parseInt(a[0].slice(-2).trim())-parseInt(b[0].slice(-2).trim()))
            .map(item=>(
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
          {Object.entries(data.labs[lab].nodes)
            .sort((a, b) => parseInt(a[0].slice(2,4).trim().replace('-',''))-parseInt(b[0].slice(2,4).trim().replace('-','')))
            .map(item=>(
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
