import React from 'react'

const GeneFamily = (props) => {
  return (
    <div className="categories2-gene-family">
      <h3>{props.data.name}</h3>
      <div className="categories2-gene-family-description">{props.data.description}</div>
    </div>
  )
}

export default class GeneFamilies extends React.Component {
  render(){
    const geneFamilies = this.props.data.map((value, index) => {
      return <GeneFamily key={`gene-family-${index}`} data={value} />
    })
    return (
      <div className="categories2-gene-families">
        {geneFamilies}
      </div>
    )
  }
}
