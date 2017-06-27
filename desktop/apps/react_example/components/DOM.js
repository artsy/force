import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Backbone from 'backbone'

const MyBackboneView = Backbone.View.extend({
  events: {
    'click button.js-button': 'handleClick'
  },

  render: function () {
    console.log('mounting backbone view!')
  },

  handleClick: function () {
    console.warn('Backbone button clicked!')
  }
})

export default class DOM extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount () {
    this.$ = require('jquery')

    this.view = new MyBackboneView({
      el: document.querySelector('.js-backbone-view')
    })

    this.view.render()
  }

  componentWillUnmount () {
    this.view.remove()
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
