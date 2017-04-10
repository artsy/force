// Testing testing
const data = require('../data/data.json')

import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/style-utils'

import Intro from './Intro'
import FamilyList from './FamilyList'
import Content from './Content'
import GeneFamilies from './GeneFamilies'

const Column = styled.div`
  ${media.mobile`
    display: flex
    flex: 0 1 auto
    flex-flow: row wrap
  `}
`

const StyledIntro = styled(Intro)`
  padding: 2em 1em;
  h2 {
    font-size: 32px;
    line-height: 64px;
  }
`

const StyledFamilyList = styled(FamilyList)`
  padding-top: 2em;
  font-size: 14px;
  color: #333;
  padding: 2em 1em;
  text-transform: uppercase;
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
          <GeneFamilies data={this.state.data} />
        </Content>
      </Column>
    )
  }
}

export default AppContainer
