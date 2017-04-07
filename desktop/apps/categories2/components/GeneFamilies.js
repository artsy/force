import React from 'react'
import styled from 'styled-components'

const ThreeColumnDiv = styled.div`
  column-count: 3
  column-gap: 1em
  padding: 1em 0
`

const Genes = (props) => {
  return (
    <ThreeColumnDiv>
        <ul>
          {
            props.data.map((gene) => {
              return <li key={gene.id}>{gene.name}</li>
            })
          }
        </ul>
    </ThreeColumnDiv>
  )
}

Genes.propTypes = {
  data: React.PropTypes.array
}

const StyledGeneFamily = styled.div`
  border-top: 1px solid #ccc
  margin: 0 1em
  padding: 1em 0
`

const StyledH3 = styled.h3`
  font-size: 20px
  line-height: 30px
`

const GeneFamily = (props) => {
  return (
    <StyledGeneFamily id={props.id}>
      <StyledH3>{props.name}</StyledH3>
      <div>{props.description}</div>
      <Genes data={props.genes}/>
    </StyledGeneFamily>
  )
}

GeneFamily.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  genes: React.PropTypes.array
}

const GeneFamilies = (props) => {
  return (
    <div className="categories2-gene-families">
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

GeneFamilies.propTypes = {
  data: React.PropTypes.array
}

export default GeneFamilies
