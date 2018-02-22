import $ from 'jquery'

import React from 'react'
import ReactDOM from 'react-dom'
import { Contents } from '@artsy/reaction/dist/Components/Artist/MarketInsights'
import { ContextProvider } from '@artsy/reaction/dist/Components/Artsy'

const renderMarketInsightsFor = (artistID) => {
  const elementID = 'market-insights-container-' + artistID
  ReactDOM.render((
    <ContextProvider>
      <Contents artistID={artistID} />
    </ContextProvider>), document.getElementById(elementID))
}

function setupMarketInsights () {
  $('section.artwork-section.artwork-artist[data-artist-id]').each((i, el) => {
    renderMarketInsightsFor($(el).data('artist-id'))
  })
}

export default { setupMarketInsights }
