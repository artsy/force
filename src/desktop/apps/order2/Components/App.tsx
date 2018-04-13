import React, { Component } from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import { OrderForm } from '@artsy/reaction/dist/Components/Forms/OrderForm'

interface Props {}

export const App = hot(module)(
  class extends Component<Props> {
    componentDidMount() {
      console.log('mounted on client')
    }

    render() {
      return (
        <Container>
          <OrderForm />
        </Container>
      )
    }
  }
)

const Container = styled.div`
  border: 1px solid black;
`
