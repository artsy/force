// Testing testing
const data = require('../data/data.json')

import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/style-utils'

import Intro from './Intro'
import FamilyList from './FamilyList'
import Content from './Content'
import FamilyAndGeneList from './FamilyAndGeneList'

const Column = styled.div`
  ${media.mobile`
    display: flex
    flex: 0 1 auto
    flex-flow: row wrap
  `}
`

const StyledIntro = styled(Intro)`
  h2 {
    font-size: 32px;
    line-height: 100%;
  }
`

const StyledFamilyList = styled(FamilyList)`
  font-size: 14px;
  color: #333;
  text-transform: uppercase;
`

const StyledFamilyAndGeneList = styled(FamilyAndGeneList)`
  ${media.mobile`
    ul {
      column-count: 3;
      column-gap: 1em;
      padding: 1em 0;
    }
  `}
`

class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {data}
  }

  render () {
    return (
      <Column>
        <StyledFamilyList data={this.state.data} />
        <Content>
          <StyledIntro />
          <StyledFamilyAndGeneList data={this.state.data} />
        </Content>
      </Column>
    )
  }
}

export default AppContainer
