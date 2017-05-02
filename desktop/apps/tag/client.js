import React from 'react'
import ReactDOM from 'react-dom'
import * as Relay from 'react-relay'
import { data as sd } from 'sharify'

import components from '../../../node_modules/@artsy/reaction-force/dist/components/index'
import * as Artsy from '../../../node_modules/@artsy/reaction-force/dist/components/artsy'
import FilterArtworksQueryConfig from '../../../node_modules/@artsy/reaction-force/dist/relay/queries/filter_artworks'


function artsyNetworkLayer (user) {
  return new Relay.DefaultNetworkLayer(sd.METAPHYSICS_ENDPOINT, {
    headers: !sd.CURRENT_USER ? {
      'X-USER-ID': sd.CURRENT_USER.id,
      'X-ACCESS-TOKEN': sd.CURRENT_USER.accessToken
    } : {}
  })
}

function init () {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  ReactDOM.render(
    <Artsy.ContextProvider currentUser={sd.CURRENT_USER}>
      <Relay.RootContainer
        Component={components.ArtworkFilter}
        route={new FilterArtworksQueryConfig({ tag_id: sd.TAG.id })}
      />
    </Artsy.ContextProvider>, document.getElementById('tag-filter')
  )
}

export default { init }
