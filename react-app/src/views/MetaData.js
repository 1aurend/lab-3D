import React from 'react';
import { Heading, Text, Link} from 'rebass/styled-components'
import styled from 'styled-components';

const SourceLink = props =>
  <Link
    {...props}
    sx={{
      color: 'blue',
      textDecoration:'none',
      fontSize: ['10px', '12px']
      // textDecoration:'underline wavy'
    }}
  />

const TaxonHeading = props =>
  <Heading
    {...props}
    sx={{
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontStyle: 'italic',
      fontSize:['16px', '20px'],
      letterSpacing:'0.5px',
      color: 'white'
    }}
  />

const AttributionInstitution = props =>
  <Text
    {...props}
    sx={{
      textTransform: 'uppercase',
      letterSpacing: '2.5px',
      color: 'amber',
      marginTop: '3px',
      fontSize:['10px', '12px']
    }}
  />

const AttributionPeople = props =>
  <Text
    {...props}
    sx={{
      textTransform: 'uppercase',
      letterSpacing: '2.5px',
      color: 'ochre',
      marginTop: '3px',
      fontSize:['10px', '12px']
    }}
  />

const MetaData = (props) => {
  const {metadata, resource} = props.data
  const {taxon, attribution} = metadata
  if (attribution.institution == "Museum of Comparative Zoology (MCZ)"){
      return(
        <>
          <TaxonHeading>
              <em>{taxon}</em>
          </TaxonHeading>
        <AttributionInstitution>{attribution.institution}</AttributionInstitution>
        <AttributionPeople>{attribution.people}</AttributionPeople>
        </>
      )}
  else {
      return(
        <>
          <TaxonHeading>
            <em>{taxon}</em>
          </TaxonHeading>
        <AttributionInstitution>{attribution.institution}</AttributionInstitution>
        <AttributionPeople>{attribution.people}</AttributionPeople>
        <SourceLink href={resource} target="_blank">
          [link]
        </SourceLink>
        </>
      )
    }
}

export default MetaData
