import React from 'react';
import { Heading, Text} from 'rebass/styled-components'
import styled from 'styled-components';

const MetaData = (props) => {
  const {taxon, attribution} = props.data
  if (!attribution.people){
    return(
      <>
      <Heading color='white'><em>{taxon}</em></Heading>
      <Text color='white'>{attribution.institution}</Text>
      </>
    )} else {
      return(
        <>
        <Heading color='white' ><em>{taxon}</em></Heading>
        <Text color='white'>{attribution.institution}</Text>
        <Text color='white'>{attribution.people}</Text>
        </>
      )
    }
}

export default MetaData
