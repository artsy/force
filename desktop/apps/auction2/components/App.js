import Index from 'desktop/apps/auction2/components/server/index'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

export default class App extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <Index {...this.props} />
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}
