import { buildClientApp } from 'reaction/Router'
import { data as sd } from 'sharify'
import { routes } from 'reaction/Apps/Artist/routes'
import mediator from 'desktop/lib/mediator.coffee'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import qs from 'querystring'
import { clone, isArray } from 'underscore'

mediator.on('artist:filter:changed', filters => {
  onFilterChange(filters)
})

buildClientApp({ routes, user: sd.CURRENT_USER })
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <Container>
        <ClientApp mediator={mediator} />
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

// Update URL with current filters and sort.
const onFilterChange = filters => {
  const params = clone(filters)
  Object.keys(params).forEach(filter => {
    if (
      !params[filter] ||
      (isArray(params[filter]) && params[filter].length === 0)
    ) {
      delete params[filter]
    }
  })

  const fragment = '?' + qs.stringify(params)
  window.history.pushState({}, null, fragment)
}

// FIXME: Move this to Reaction
const Container = styled.div`
  width: 100%;
  max-width: 1192px;
  margin: auto;
`
