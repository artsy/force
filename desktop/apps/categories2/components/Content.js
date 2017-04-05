import React from 'react'

export default class Content extends React.Component {
  render(){
    return (
      <div className="categories2-content">
        {this.props.children}
      </div>
    )
  }
}
