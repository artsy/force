import $ from 'jquery'
import App from 'desktop/apps/auction2/components/App'
import Auction from 'desktop/models/auction.coffee'
import ConfirmRegistrationModal from 'desktop/components/credit_card/client/confirm_registration.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import React from 'react'
import ReactDOM from 'react-dom'
import auctionReducer from 'desktop/apps/auction2/reducers'
import configureStore from 'desktop/apps/auction2/utils/configureStore'
import mediator from 'desktop/lib/mediator.coffee'

// Rehydrate data from Server
const user = CurrentUser.orNull()
const bootstrapData = window.__BOOTSTRAP__
const auctionModel = new Auction(bootstrapData.auction)

// Redux store
const store = configureStore(auctionReducer, {
  auctionArtworks: bootstrapData.auctionArtworks
})

// Store model on bootstrap data as we need access to Sale Backbone methods
bootstrapData.auction = auctionModel

// Start app
ReactDOM.render(
  <App
    {...bootstrapData}
    store={store}
  />,
  document.getElementById('react-root')
)

maybeShowRegistration()

// Helpers

/**
 * If a user is redirected to page post-registration, show modal; or if no user
 * is found, listen for registration button clicks and show login window.
 */
function maybeShowRegistration () {
  if (user) {
    if (location.pathname.match('/confirm-registration')) {
      new ConfirmRegistrationModal({
        auction: auctionModel
      })
    }

    // User not found. Login before registration can proceeed
  } else {
    const $registerBtn = $('body').find('.js-register-button')

    $registerBtn.on('click', (event) => {
      if (!user) {
        event.preventDefault()

        mediator.trigger('open:auth', {
          mode: 'register',
          redirectTo: $(event.target).attr('href')
        })
      }
    })
  }
}
