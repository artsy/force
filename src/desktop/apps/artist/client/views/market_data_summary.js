import React from 'react'
import ReactDOM from 'react-dom'
import { Contents } from 'reaction/Components/Artist/MarketDataSummary'
import { ContextProvider } from 'reaction/Components/Artsy'

function renderArtistMarketDataSummary(artistID) {
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

export default { renderArtistMarketDataSummary }
