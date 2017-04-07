// Testing testing
const data = require('../data/data.json')

import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/style-utils';

import Intro from './Intro'
import Sidebar from './Sidebar'
import Content from './Content'
import GeneFamilies from './GeneFamilies'

const Column = styled.div`
  ${ media.mobile`
    display: flex
    flex: 0 1 auto
    flex-flow: row wrap
  ` }
`

class AppContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {data}
  }

  render(){
    return (
      <Column>
        <Sidebar data={this.state.data}/>
        <Content>
          <Intro />
          <GeneFamilies data={this.state.data} />
        </Content>
      </Column>
    )
  }
}

export default AppContainer
