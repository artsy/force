import $ from 'jquery'

import React from 'react'
import ReactDOM from 'react-dom'
import { Contents } from 'reaction/Components/Artist/MarketDataSummary'
import { ContextProvider } from 'reaction/Components/Artsy'

function renderArtistMarketDataSummaryFor(artistID) {
  const elementID = 'market-data-summary-container-' + artistID
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

function setupArtistMarketDataSummary() {
  $('.market-data-summary[data-artist-id]').each((i, el) => {
    renderArtistMarketDataSummaryFor($(el).data('artist-id'))
  })
}

export default { setupArtistMarketDataSummary }
