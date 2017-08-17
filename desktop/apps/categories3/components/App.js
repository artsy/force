import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GeneFamilyNav from './GeneFamilyNav'
import TAGPContent from './TAGPContent'

const Layout = styled.div`
  background: yellow;
  display: flex;
  justify-content: space-between;
`
class App extends Component {
  static propTypes = {
    geneFamilies: PropTypes.array.isRequired
  }

  render() {
    const { geneFamilies } = this.props
    return (
      <Layout>
        <GeneFamilyNav geneFamilies={geneFamilies} />
        <TAGPContent geneFamilies={geneFamilies} />
      </Layout>
    )
  }
}

export default App
