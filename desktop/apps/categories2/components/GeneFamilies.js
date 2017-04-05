import React from 'react'

const GeneFamily = (props) => {
  return (
    <div className="categories2-gene-family">
      <h3>{props.data.name}</h3>
      <div className="categories2-gene-family-description">
        {props.data.description}
      </div>
    </div>
  )
}

const GeneFamilies = (props) => {
  return (
    <div className="categories2-gene-families">
      {
        props.data.map((value, index) => {
          return <GeneFamily key={value.id} data={value} />
        })
      }
    </div>
  )
}

export default GeneFamilies
