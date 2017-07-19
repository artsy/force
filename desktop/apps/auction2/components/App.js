import DOM from 'desktop/apps/auction2/components/DOM'
import Layout from 'desktop/apps/auction2/components/Layout'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <DOM>
          <Layout />
        </DOM>
      </Provider>
    )
  }
}
