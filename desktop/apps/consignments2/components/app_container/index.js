import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  resizeWindow
} from '../../client/actions'

class AppContainer extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResizeEvent)
    this.props.resizeWindowAction(window.innerWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeEvent)
  }

  handleResizeEvent = () => {
    this.props.resizeWindowAction(window.innerWidth)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  resizeWindowAction: resizeWindow
}

export default connect(
  null,
  mapDispatchToProps
)(AppContainer)
