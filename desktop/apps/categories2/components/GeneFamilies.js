import React from 'react'

function partitionArray(array) {
  const parts = 3
  const size = array.length / parts
  const remainder = array.length % parts
  return [
    array.splice(0, size + remainder),
    array.splice(0, size),
    array
  ]
}

const Genes = (props) => {
  const columns = partitionArray(props.data)
  return (
    <div className="categories2-genes">
      {
        columns.map((column, index) => {
          return (
            <div key={`column-${index}`} className="categories2-genes-column">
              <ul>
                {
                  column.map((gene) => {
                    return <li key={gene.id}>{gene.name}</li>
                  })
                }
              </ul>
            </div>
          )
        })
      }
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
        props.data.map((value, index) => {
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
