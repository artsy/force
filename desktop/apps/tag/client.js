import React from 'react'
import ReactDOM from 'react-dom'
import * as Relay from 'react-relay'
import { data as sd } from 'sharify'

import components from '../../../node_modules/@artsy/reaction-force/dist/components/index'
import { FilterArtworksQueryConfig } from '../../../node_modules/@artsy/reaction-force/dist/relay/root_queries'

function artsyNetworkLayer () {
  return new Relay.DefaultNetworkLayer(sd.METAPHYSICS_ENDPOINT)
}

function init () {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  ReactDOM.render(
    <Relay.RootContainer
      Component={components.ArtworkFilter}
      route={new FilterArtworksQueryConfig()}
    />, document.getElementById('tag-filter')
  )
}

export default init
