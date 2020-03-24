import React from 'react';
import { Heading, Text, Link} from 'rebass/styled-components'
import styled from 'styled-components';

const SourceLink = props =>
  <Link
    {...props}
    sx={{
      color: 'blue',
      textDecoration:'none'

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
  if (attribution.origin){
      return(
        <>
          <TaxonHeading>
            <SourceLink href={attribution.origin} target="_blank">
              <em>{taxon}</em>
            </SourceLink>
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
        </>
      )
    }
}

export default MetaData
