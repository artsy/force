import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ClockView from 'desktop/components/clock/view.coffee'

export default class Clock extends Component {
  static propTypes = {
    className: PropTypes.string,
    model: PropTypes.object,
    modelName: PropTypes.string,
    closedText: PropTypes.string
  }

  static defaultProps = {
    className: 'auction-clock white-overlay-clock js-auction-clock',
    modelName: 'Auction'
  }

  state = {
    isMounted: false
  }

  componentDidMount () {
    this.$ = require('jquery')

    const {
      closedText,
      model,
      modelName
    } = this.props

    this.setState(() => {
      this.backboneView = new ClockView({
        el: this.$('.auction-clock'),
        closedText,
        model,
        modelName
      })

      this.backboneView.start()

      return {
        isMounted: true
      }
    })
  }

  componentWillUnmount () {
    this.backboneView.remove()
  }

  render () {
    return (
      <div className={this.props.className}>
        { this.state.isMounted &&
          <div className='clock'>
            <div className='clock-header' />
            <ul className='clock-value' />
          </div> }
      </div>
    )
  }
}
