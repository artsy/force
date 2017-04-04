import React from 'react'

class Sidebar extends React.Component {
  constructor(props){
    super(props)
  }

  items(){
    const items = this.props.data
    return items.map((value, index) => {
      return <li key={`gene-${index}`}>{value.name}</li>
    })
  }

  render(){
    return (
      <div style={this.props.css}>
        <ul>
          {this.items()}
        </ul>
      </div>
    )
  }
}

export default Sidebar
