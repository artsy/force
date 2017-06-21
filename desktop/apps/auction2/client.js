import App from 'desktop/apps/auction2/components/App'
import Auction from 'desktop/models/auction.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import React from 'react'
import ReactDOM from 'react-dom'
import auctionReducer from 'desktop/apps/auction2/reducers'
import configureStore from 'desktop/apps/auction2/utils/configureStore'

// Rehydrate data from Server
const user = CurrentUser.orNull()
const bootstrapData = window.__BOOTSTRAP__
const auctionModel = new Auction(bootstrapData.auction)

// Redux store
const store = configureStore(auctionReducer, {
  auctionArtworks: bootstrapData.auctionArtworks
})

// Store model on bootstrap data as we need access to Backbone methods
bootstrapData.auction = auctionModel
bootstrapData.user = user

// Start app
ReactDOM.render(
  <App
    {...bootstrapData}
    store={store}
  />,
  document.getElementById('react-root')
)
