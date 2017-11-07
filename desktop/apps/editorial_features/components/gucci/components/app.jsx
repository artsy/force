import React, { Component } from 'react'

export default class App extends Component {
  render () {
    const { curation } = this.props
    return (
        <div className='gucci-root'>
          {curation.name}
        </div>
    )
  }
}
