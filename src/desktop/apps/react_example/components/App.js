import DOM from './DOM'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

export default class App extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    templates: PropTypes.object,
  }

  componentDidMount() {
    console.log('Component mounted on client!')
  }

  handleButtonClick = (event) => {
    console.warn('React Button clicked!', this.props.description)
  }

  render() {
    const { name, description, templates: { MyJadeView } } = this.props

    return (
      <DOM>
        <div>
          <strong>React</strong>
          <hr />

          <h1>Hello {name}!</h1>

          <StyledParagraph>{description}</StyledParagraph>

          <button onClick={this.handleButtonClick}>Click me!</button>
        </div>

        <br />

        <div>
          <strong>Jade</strong>
          <hr />

          <div
            dangerouslySetInnerHTML={{
              __html: MyJadeView,
            }}
          />
        </div>
      </DOM>
    )
  }
}

const StyledParagraph = styled.p`
  color: red;
`
