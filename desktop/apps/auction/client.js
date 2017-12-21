import App from 'desktop/apps/auction/components/App'
import Articles from 'desktop/collections/articles.coffee'
import Auction from 'desktop/models/auction.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import React from 'react'
import ReactDOM from 'react-dom'
import auctionReducer from 'desktop/apps/auction/reducers'
import configureStore from 'desktop/components/react/utils/configureStore'
import { rehydrateClient } from 'desktop/components/react/utils/renderReactLayout'

export default () => {
  // Rehydrate data from Server
  const bootstrapData = rehydrateClient(window.__BOOTSTRAP__)
  const auctionModel = new Auction(bootstrapData.app.auction)
  const auctionArticles = new Articles(bootstrapData.app.articles)
  const { templateComponents } = bootstrapData

  // TODO: Refactor out Backbone
  bootstrapData.app.user = CurrentUser.orNull()
  bootstrapData.app.auction = auctionModel
  bootstrapData.app.articles = auctionArticles

  // Redux store
  const store = configureStore(auctionReducer, {
    app: bootstrapData.app,
    artworkBrowser: bootstrapData.artworkBrowser
  })

  // Start app
  ReactDOM.hydrate(
    <App
      store={store}
      templateComponents={templateComponents}
    />,
    document.getElementById('react-root')
  )
}
