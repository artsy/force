import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ClockView from 'desktop/components/clock/view.coffee'

export default class Clock extends Component {
  static propTypes = {
    className: PropTypes.string,
    model: PropTypes.object,
    modelName: PropTypes.string
  }

  static defaultProps = {
    className: 'auction-clock white-overlay-clock js-auction-clock',
    modelName: 'Auction'
  }

  componentDidMount () {
    this.$ = require('jquery')

    const {
      model,
      modelName
    } = this.props

    this.backboneView = new ClockView({
      model,
      modelName,
      el: this.$('.auction-clock')
    })

    this.backboneView.start()
  }

  componentWillUnmount () {
    this.backboneView.remove()
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className='clock'>
          <div className='clock-header' />
          <ul className='clock-value' />
        </div>
      </div>
    )
  }
}
