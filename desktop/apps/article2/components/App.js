import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import components from '@artsy/reaction-force/dist/components/publishing/index'
// const Image = React.createFactory(components.Image)
// console.log(components)
export default class App extends Component {
  static propTypes = {
    article: PropTypes.object
  }

  componentDidMount () {
    console.log('Component mounted on client!')
  }

  render () {
    const { article } = this.props
    return (
      <div style={{ width: 400 }}>
        HELLO WORLD!
      </div>
    )
  }
}
