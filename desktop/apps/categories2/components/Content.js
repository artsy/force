import React from 'react'

export default class Content extends React.Component {
  render(){
    return (
      <div style={this.props.css}>
        {this.props.children}
      </div>
    )
  }
}
