import React from 'react'

const Genes = (props) => {
  return (
    <div className="categories2-genes">
      <div className="categories2-genes-column">
        <ul>
          {
            props.data.map((gene) => {
              return <li key={gene.id}>{gene.name}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

Genes.propTypes = {
  data: React.PropTypes.array
}

const GeneFamily = (props) => {
  return (
    <div id={props.id} className="categories2-gene-family">
      <h3>{props.name}</h3>
      <div className="categories2-gene-family-description">
        {props.description}
      </div>
      <Genes data={props.genes}/>
    </div>
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
