import PropTypes from "prop-types"
import React, { Component } from "react"

export function withFullScreen(ComponentToWrap): any {
  return class FullScreenWrapper extends Component {
    static contextTypes = {
      onViewFullscreen: PropTypes.func.isRequired,
      openViewer: PropTypes.func.isRequired,
      closeViewer: PropTypes.func.isRequired,
      slideIndex: PropTypes.number.isRequired,
      viewerIsOpen: PropTypes.bool.isRequired,
    }

    render() {
      return (
        <ComponentToWrap {...this.context} {...this.props} {...this.state} />
      )
    }
  }
}
