// Testing testing
const data = require('../data/data.json')

import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/style-utils'

import Intro from './Intro'
import FamilyList from './FamilyList'
import FamilyAndGeneList from './FamilyAndGeneList'

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
  .gene-family {
    border-top: 1px solid #ccc
  }
  h3 {
    font-size: 20px;
    line-height: 30px;
  }
  ${media.mobile`
    ul {
      column-count: 3;
      column-gap: 1em;
    }
  `}
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  ${media.mobile`
    flex-direction: row;
  `}
`

const Column = styled.div`
  flex: 0 0 ${props => props.width * (100.0 / 12)}%;
`

class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {data}
  }

  render () {
    return (
      <Grid>
        <Column width={3}>
          <StyledFamilyList data={this.state.data} />
        </Column>
        <Column width={9}>
          <StyledIntro />
          <StyledFamilyAndGeneList data={this.state.data} />
        </Column>
      </Grid>
    )
  }
}

export default AppContainer
