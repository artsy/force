import { Theme } from "@artsy/palette"
import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import GeneFamilyNav from "./GeneFamilyNav"
import TAGPContent from "./TAGPContent"

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  max-width: 1250px;
  margin: auto;
`
class App extends Component {
  static propTypes = {
    geneFamilies: PropTypes.array.isRequired,
  }

  render() {
    const { geneFamilies, allFeaturedGenesByFamily } = this.props
    return (
      <Theme>
        <Layout>
          <GeneFamilyNav geneFamilies={geneFamilies} />
          <TAGPContent geneFamilies={geneFamilies} />
        </Layout>
      </Theme>
    )
  }
}

export default App
