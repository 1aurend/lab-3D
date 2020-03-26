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
      fontStyle: 'italic',
      color: 'white'
    }}
  />

const AttributionInstitution = props =>
  <Text
    {...props}
    sx={{
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: 'amber',
      marginTop: '1em',
      fontSize:['10px', '12px']
    }}
  />

const AttributionPeople = props =>
  <Text
    {...props}
    sx={{
      textTransform: 'uppercase',
      letterSpacing: '0.125em',
      color: 'ochre',
      marginTop: '0.25em',
      fontSize:['10px', '12px']
    }}
  />

const MetaData = (props) => {
  const {taxon, attribution} = props.data
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
        <SourceLink href={attribution.origin} target="_blank">
          [link]
        </SourceLink>
        </>
      )
    }
}

export default MetaData
