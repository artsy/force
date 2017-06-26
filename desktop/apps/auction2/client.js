import App from 'desktop/apps/auction2/components/App'
import Articles from 'desktop/collections/articles.coffee'
import Auction from 'desktop/models/auction.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import React from 'react'
import ReactDOM from 'react-dom'
import auctionReducer from 'desktop/apps/auction2/reducers'
import configureStore from 'desktop/apps/auction2/utils/configureStore'

// Rehydrate data from Server
const bootstrapData = window.__BOOTSTRAP__
const auctionModel = new Auction(bootstrapData.app.auction)
const auctionArticles = new Articles(bootstrapData.app.articles)

// TODO: Refactor out Backbone
bootstrapData.app.user = CurrentUser.orNull()
bootstrapData.app.auction = auctionModel
bootstrapData.app.articles = auctionArticles

// Redux store
const store = configureStore(auctionReducer, {
  app: bootstrapData.app,
  auctionArtworks: bootstrapData.auctionArtworks
})

// Start app
ReactDOM.render(
  <App
    store={store}
  />,
  document.getElementById('react-root')
)
