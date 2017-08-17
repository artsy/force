import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GeneFamilyNav from './GeneFamilyNav'
import TAGPContent from './TAGPContent'

class App extends Component {
  static propTypes = {
    geneFamilies: PropTypes.array.isRequired
  }

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
