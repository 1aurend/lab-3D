import React from 'react';
import { Heading, Text} from 'rebass/styled-components'
import styled from 'styled-components';

const MetaData = (props) => {
  const {taxon, attribution} = props.data
  if (!attribution.people){
    return(
      <>
      <Heading color='white'>Taxon: </Heading><Text color='white'>{taxon}</Text>
      <Heading color='white'>Institution: </Heading><Text color='white'>{attribution.institution}</Text>
      </>
    )} else {
      return(
        <>
        <Heading color='white' >Taxon: </Heading><Text color='white'>{taxon}</Text>
        <Heading color='white'>Institution: </Heading><Text color='white'>{attribution.institution}</Text>
        <Heading color='white'>Scanned by: </Heading><Text color='white'>{attribution.people}</Text>
        </>
      )
    }
}

export default MetaData
