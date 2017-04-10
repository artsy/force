import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { media } from '../styles/style-utils';

FamilyAndGeneList.propTypes = {
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

function FamilyAndGeneList(props){
  return (
    <div className={props.className}>
      {
        props.data.map((family) => {
          return (
            <GeneFamily
              key={family.id}
              id={family.id}
              name={family.name}
              description={family.description}
              genes={family.genes}
            />
          )
        })
      }
    </div>
  )
}

function GeneFamily(props){
  return (
    <div id={props.id}>
      <h3>{props.name}</h3>
      <div>{props.description}</div>
      <Genes data={props.genes}/>
    </div>
  )
}

function Genes(props){
  return (
    <ul>
      {
        props.data.map((gene) => {
          return <li key={gene.id}>{gene.name}</li>
        })
      }
    </ul>
  )
}

export default FamilyAndGeneList
