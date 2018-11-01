import { buildClientApp } from "reaction/Router"
import { data as sd } from "sharify"
import { routes } from "reaction/Apps/Collections/routes"
import mediator from "desktop/lib/mediator.coffee"
import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

buildClientApp({ routes, user: sd.CURRENT_USER })
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <Container>
        <ClientApp mediator={mediator} />
      </Container>,

      document.getElementById("react-root")
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}

// FIXME: Move this to Reaction
const Container = styled.div`
  width: 100%;
  max-width: 1192px;
  margin: auto;
`
