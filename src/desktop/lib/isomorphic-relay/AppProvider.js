import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class AppProvider extends Component {
  static childContextTypes = {
    provide: PropTypes.object,
  }

  getChildContext() {
    return {
      provide: this.props.provide,
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export function injectContext(getContextSlice, WrappedComponent) {
  return class RelayRouterContextInjector extends Component {
    static contextTypes = {
      provide: PropTypes.object.isRequired,
    }

    render() {
      const contextSlice = getContextSlice(this.context.provide)

      return (
        <WrappedComponent {...contextSlice} {...this.props} {...this.state} />
      )
    }
  }
}
