import React from 'react'

export default class Sidebar extends React.Component {
  render(){
    const { data } = this.props
    return (
      <div className="categories2-sidebar">
        <ul>{ 
          data.map(
            (value) => <li key={`gene-${value.id}`}>{value.name}</li>
          )
        }</ul>
      </div>
    )
  }
}
