import React from 'react'

const GeneFamily = (props) => {
  const styles = {
    backgroundColor: 'white',
    borderBottom: '1px solid #333',
    padding: '1em'
  }

  return (
    <div style={styles}>
      <h3>{props.data.name}</h3>
      <div className="description">{props.data.description}</div>
    </div>
  )
}

class GeneFamilies extends React.Component {
  render(){
    const geneFamilies = this.props.data.map((value, index) => {
      return <GeneFamily key={`gene-family-${index}`} data={value} />
    })
    return (
      <div className="gene-families">
        {geneFamilies}
      </div>
    )
  }
}

export default GeneFamilies
