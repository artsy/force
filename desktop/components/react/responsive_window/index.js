import PropTypes from 'prop-types'
import React, { Component } from 'react'
import u from 'updeep'
import { connect } from 'react-redux'

const MOBILE_BREAKPOINT = 640

// Actions
const RESIZE_WINDOW = 'RESIZE_WINDOW'

export const responsiveWindowAction = (windowSize) => ({
  type: RESIZE_WINDOW,
  payload: {
    windowSize
  }
})

// Reducer
export function responsiveWindowReducer (state, action) {
  switch (action.type) {
    case RESIZE_WINDOW: {
      return u({
        isMobile: action.payload.windowSize <= MOBILE_BREAKPOINT
      }, state)
    }
    default:
      return state
  }
}

class ResponsiveWindow extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResizeEvent)
    this.props.onChange(window.innerWidth)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResizeEvent)
  }

  handleResizeEvent = () => {
    this.props.onChange(window.innerWidth)
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  onChange: responsiveWindowAction
}

export default connect(
  null,
  mapDispatchToProps
)(ResponsiveWindow)
