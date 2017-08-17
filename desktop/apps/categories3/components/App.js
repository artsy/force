import React, { Component } from 'react'
import GeneFamilyNav from './GeneFamilyNav'
import TAGPContent from './TAGPContent'

class App extends Component {
  render() {
    const { geneFamilies } = this.props
    return (
      <div>
        <GeneFamilyNav geneFamilies={geneFamilies} />
        <TAGPContent geneFamilies={geneFamilies} />
      </div>
    )
  }
}

export default App
