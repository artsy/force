import React from 'react'
import ReactDOM from 'react-dom'
import * as Relay from 'react-relay'
import { data as sd } from 'sharify'

import { artsyNetworkLayer } from '@artsy/reaction-force/dist/Relay/config'
import components from '@artsy/reaction-force/dist/Components'
import * as Artsy from '@artsy/reaction-force/dist/Components/Artsy'
import FilterArtworksQueryConfig from '@artsy/reaction-force/dist/Relay/Queries/FilterArtworks'

function init () {
  Relay.injectNetworkLayer(artsyNetworkLayer(sd.CURRENT_USER))
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
