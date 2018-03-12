import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { throttle } from 'underscore'

const THROTTLE_MS = 200

export default class InfiniteScroll extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onTrigger: PropTypes.func.isRequired,
    triggerElement: PropTypes.string.isRequired,
  }

  state = {
    isMounted: false,
    $node: {},
  }

  componentDidMount() {
    const { triggerElement } = this.props

    this.$ = require('jquery')
    this.$(window).on(`scroll${triggerElement}`, this.handleScroll())

    this.setState(() => {
      return {
        isMounted: true,
        $node: this.$(triggerElement),
      }
    })
  }

  componentWillUnmount() {
    this.$(window).off(`scroll${this.props.triggerElement}`)
  }

  handleScroll = () => {
    const { onTrigger } = this.props

    return throttle(() => {
      const { isMounted, $node } = this.state

      if (!isMounted) {
        return
      }

      // TODO: Add ability to pass in threshold
      const threshold =
        this.$(window).height() + this.$(window).scrollTop() + 500 // px push
      const isTriggered =
        $node.height() > 0 && threshold >= $node.offset().top + $node.height()

      if (isTriggered) {
        onTrigger()
      }
    }, THROTTLE_MS)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
