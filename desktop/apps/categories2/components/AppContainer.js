// Testing testing
const data = require('../data/data.json')

import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/style-utils'

import Intro from './Intro'
import FamilyList from './FamilyList'
import FamilyAndGeneList from './FamilyAndGeneList'

const StyledIntro = styled(Intro)`
  font-size: 20px;
  line-height: 1.33em;
  p {
    margin: 1em 0;
  }
  h2 {
    font-size: 50px;
    line-height: 100%;
  }
`

const StyledFamilyList = styled(FamilyList)`
  color: #333;
  font-size: 14px;
  margin-bottom: 2em;
  text-transform: uppercase;
  position: fixed;
`

const StyledFamilyAndGeneList = styled(FamilyAndGeneList)`
  .gene-family {
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 1em 0;
  }
  h3 {
    font-size: 25px;
    line-height: 1.4em;
  }
  ul {
    margin: 1em 0;
  }
  ${media.mobile`
    ul {
      column-count: 3;
      column-gap: 1em;
    }
  `}
`

const Grid = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  ${media.mobile`
    flex-direction: row;
  `}
`

const Column = styled.div`
  flex: 0 0 ${props => props.width * (100.0 / 12)}%;
  padding: 0 0.5em;
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
