import DOM from './DOM'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class App extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    templateComponents: PropTypes.object
  }

  componentDidMount () {
    console.log('Component mounted on client!')
  }

  handleButtonClick = (event) => {
    console.warn('React Button clicked!', this.props.description)
  }

  render () {
    const {
      name,
      description,
      templateComponents: {
        MyJadeView
      }
    } = this.props

    return (
      <DOM>
        <div>
          <strong>
            React
          </strong>
          <hr />

          <h1>
            Hello {name}!
          </h1>

          <p>
            {description}
          </p>

          <button onClick={this.handleButtonClick}>
            Click me!
          </button>
        </div>

        <br />

        <div>
          <strong>
            Jade
          </strong>
          <hr />

          <MyJadeView.Component />
        </div>
      </DOM>
    )
  }
}
