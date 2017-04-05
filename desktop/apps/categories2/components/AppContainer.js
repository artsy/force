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
    this.state = {data}
  }

  render(){
    return (
      <div className='categories2-app-container'>
        <Sidebar data={this.state.data}/>
        <Content>
          <Intro />
          <GeneFamilies data={this.state.data} />
        </Content>
      </div>
    )
  }
}

export default AppContainer
