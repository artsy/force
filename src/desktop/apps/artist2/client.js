import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { buildClientApp } from 'reaction/Router'
import { routes } from 'reaction/Styleguide/Pages/Artist/routes'
import { data as sd } from 'sharify'
import mediator from 'desktop/lib/mediator.coffee'

buildClientApp({ routes, user: sd.CURRENT_USER })
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <Container>
        <ClientApp force={{ mediator }} />
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

const Container = styled.div`
  width: 100%;
  max-width: 1192px;
  margin: auto;
`
