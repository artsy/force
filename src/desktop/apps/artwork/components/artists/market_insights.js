import $ from 'jquery'

import React from 'react'
import ReactDOM from 'react-dom'
import { Contents } from 'reaction/Components/Artist/MarketInsights'
import { ContextProvider } from 'reaction/Components/Artsy'

const renderMarketInsightsFor = artistID => {
  const elementID = 'market-insights-container-' + artistID
  const mountPoint = document.getElementById(elementID)

  if (mountPoint) {
    ReactDOM.render(
      <ContextProvider>
        <Contents artistID={artistID} />
      </ContextProvider>,
      mountPoint
    )
  }
}

function setupMarketInsights() {
  $('section.artwork-section.artwork-artist[data-artist-id]').each((i, el) => {
    renderMarketInsightsFor($(el).data('artist-id'))
  })
}

export default { setupMarketInsights }
