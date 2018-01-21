import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: black;
  font-size: 40px;
  color: white;
`

Container.displayName = 'Container'

export class App extends Component {
  render () {
    return (
      <Container>
        hi!!!!! 10
      </Container>
    )
  }
}
