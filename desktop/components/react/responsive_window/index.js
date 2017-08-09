import PropTypes from 'prop-types'
import React, { Component } from 'react'
import u from 'updeep'
import { composeReducers } from 'desktop/components/react/utils/composeReducers'
import { connect } from 'react-redux'
import { debounce } from 'underscore'

// Set responsive-breakpoint width. Must match value found at
// desktop/components/stylus_lib/index.styl#25 (responsive-mobile-width - 1).
const MOBILE_BREAKPOINT = 767

// Actions
const RESIZE_WINDOW = 'RESIZE_WINDOW'

const responsiveWindowAction = (windowSize) => ({
  type: RESIZE_WINDOW,
  payload: {
    windowSize
  }
})

// Reducer
function responsiveWindowReducer (state, action) {
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

    // Needed to get around issues where legacy Backbone code needs to mount,
    // avoiding race conditions. Could possibly be fixed in React 16.
    setTimeout(() => {
      this.props.onChange(window.innerWidth)
    }, 1)
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

const mapDispatchToProps = (dispatch) => {
  const onChange = debounce(
    (innerWidth) => dispatch(responsiveWindowAction(innerWidth)), 10, true)

  return {
    onChange
  }
}

// API
export {
  composeReducers,
  responsiveWindowAction,
  responsiveWindowReducer
}

export default connect(
  null,
  mapDispatchToProps
)(ResponsiveWindow)
