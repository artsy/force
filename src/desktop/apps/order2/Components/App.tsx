import React, { Component } from 'react'
import styled from 'styled-components'
import { Layout } from './Layout'

interface Props {}

export class App extends Component<Props> {
  componentDidMount() {
    console.log('mounted on client')
  }

  render() {
    return (
      <Container>
        App
        <Layout />
      </Container>
    )
  }
}

const Container = styled.div`
  border: 1px solid black;
`
