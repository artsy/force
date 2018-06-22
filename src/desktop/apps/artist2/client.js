import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { buildClientApp } from 'reaction/Router'
import { routes } from './routes'

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
`

buildClientApp({ routes })
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <Container>
        <ClientApp />
      </Container>,
      document.getElementById('react-root')
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
