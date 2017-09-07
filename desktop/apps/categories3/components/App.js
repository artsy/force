import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GeneFamilyNav from './GeneFamilyNav'
import TAGPContent from './TAGPContent'

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
`
class App extends Component {
  static propTypes = {
    geneFamilies: PropTypes.array.isRequired,
    allFeaturedGenesByFamily: PropTypes.array.isRequired
  }

  render () {
    const { geneFamilies, allFeaturedGenesByFamily } = this.props
    return (
      <Layout>
        <GeneFamilyNav geneFamilies={geneFamilies} />
        <TAGPContent
          geneFamilies={geneFamilies}
          allFeaturedGenesByFamily={allFeaturedGenesByFamily}
        />
      </Layout>
    )
  }
}

export default App
