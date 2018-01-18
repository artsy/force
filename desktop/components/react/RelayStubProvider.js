import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

export class RelayStubProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isReuqired,
    relay: PropTypes.object
  }

  static defaultProps = {
    relay: {
      environment: new Environment({
        network: Network.create(x => x),
        store: new Store(new RecordSource())
      }),
      variables: {}
    }
  }

  static childContextTypes = {
    relay: PropTypes.object.isRequired
  }

  getChildContext () {
    return {
      relay: this.props.relay
    }
  }

  render () {
    console.log(this.props)
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
