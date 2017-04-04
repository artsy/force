// Testing testing
const data = require('../data/data.json')

import React from 'react'
import Intro from './Intro'
import Sidebar from './Sidebar'
import Content from './Content'
import GeneFamilies from './GeneFamilies'

class AppContainer extends React.Component {
  constructor(props){
    super(props)
    this.contentStyles = this.contentStyles.bind(this)
    this.state = {data}
  }

  contentStyles(){
    return {
      backgroundColor: 'pink',
      padding: '1em',
      margin: '0.25em'
    }
  }

  sidebarStyles(){
    return {
      backgroundColor: 'orange',
      padding: '1em',
      margin: '0.25em'
    }
  }

  render(){
    return (
      <div>
        <Sidebar data={this.state.data} css={this.sidebarStyles()}/>
        <Content css={this.contentStyles()}>
          <Intro />
          <GeneFamilies data={this.state.data} />
        </Content>
      </div>
    )
  }
}

export default AppContainer
