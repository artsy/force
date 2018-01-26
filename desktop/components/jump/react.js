import JumpView from './view.coffee'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Jump extends Component {
  static propTypes = {
    direction: PropTypes.string,
    element: PropTypes.string.isRequired,
    offset: PropTypes.string,
    threshold: PropTypes.number
  }

  static defaultProps = {
    direction: 'bottom',
    offset: '.mlh-navbar'
  }

  componentDidMount () {
    this.$ = require('jquery')

    const { threshold, direction, element, offset } = this.props

    this.backboneView = new JumpView({
      threshold: threshold || this.$(window).height(),
      direction: direction,
      element: this.$(element),
      offset: this.$(offset)
    })

    this.$('body').append(this.backboneView.$el)
  }

  componentWillUnmount () {
    this.backboneView.remove()
  }

  render () {
    return (
      <div />
    )
  }
}
