import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { media } from '../styles/style-utils';

GeneFamilies.propTypes = {
  data: PropTypes.array
}

GeneFamily.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  genes: PropTypes.array
}

Genes.propTypes = {
  data: PropTypes.array
}

function GeneFamilies(props){
  return (
    <div>
      {
        props.data.map((value) => {
          return (
            <GeneFamily
              key={value.id}
              id={value.id}
              name={value.name}
              description={value.description}
              genes={value.genes}
            />
          )
        })
      }
    </div>
  )
}

const GeneFamilyDiv = styled.div`
  border-top: 1px solid #ccc
  margin: 0 1em
  padding: 1em 0
`

const Heading = styled.h3`
  font-size: 20px
  line-height: 30px
`

function GeneFamily(props){
  return (
    <GeneFamilyDiv id={props.id}>
      <Heading>{props.name}</Heading>
      <div>{props.description}</div>
      <Genes data={props.genes}/>
    </GeneFamilyDiv>
  )
}

const MultiColumn = styled.div`
  ${ media.mobile`
    column-count: 3
    column-gap: 1em
    padding: 1em 0
  ` }
`

function Genes(props){
  return (
    <MultiColumn>
        <ul>
          {
            props.data.map((gene) => {
              return <li key={gene.id}>{gene.name}</li>
            })
          }
        </ul>
    </MultiColumn>
  )
}

export default GeneFamilies
