import React from 'react'
import ReactDOM from 'react-dom'
import App from 'desktop/apps/auctions2/components/App'
import auctionsReducer from 'desktop/apps/auctions2/reducers'
import configureStore from 'desktop/components/react/utils/configureStore'
import { rehydrateClient } from 'desktop/components/react/utils/renderReactLayout'

export default () => {
  const bootstrapData = rehydrateClient(window.__BOOTSTRAP__)

  const store = configureStore(auctionsReducer, {
    app: bootstrapData.app
  })

  ReactDOM.hydrate(
    <App store={store} />, document.getElementById('react-root')
  )
}
