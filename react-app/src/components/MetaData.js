import React from 'react';
import styled from 'styled-components';

const MetaData = (props) => {
  const {taxon, attribution} = props.data
  return(
    <div style={{color:"white", padding:'10%'}}>
      <span><strong>Taxon: </strong><em>{taxon}</em></span><br/>
      <span><strong>Institution: </strong>{attribution.institution}</span><br/>
      <span><strong>Model prepared by: </strong>{attribution.people}</span>
    </div>

  )
}

export default MetaData
