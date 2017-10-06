import PropTypes from 'prop-types'
import { Component } from 'react'
import { connect } from 'react-redux'

class DOM extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  // Selectors
  $ = null
  $body = null

  componentDidMount () {
    const FastClick = require('fastclick')
    FastClick.attach(document.body)

    this.$ = require('jquery')
    this.addEventListeners()
  }

  componentWillUnmount () {
    this.removeEventListeners()
  }

  addEventListeners () {}
  removeEventListeners () {}

  render () {
    return this.props.children
  }
}

const mapStateToProps = (state) => state

export default connect(
  mapStateToProps
)(DOM)
