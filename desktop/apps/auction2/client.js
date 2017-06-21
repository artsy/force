import $ from 'jquery'
import AddToCalendar from 'desktop/components/add_to_calendar/index.coffee'
import App from 'desktop/apps/auction2/components/App'
import Auction from 'desktop/models/auction.coffee'
import ClockView from 'desktop/components/clock/view.coffee'
import ConfirmRegistrationModal from 'desktop/components/credit_card/client/confirm_registration.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import MyActiveBids from 'desktop/components/my_active_bids/view.coffee'
import React from 'react'
import ReactDOM from 'react-dom'
import auctionReducer from 'desktop/apps/auction2/reducers'
import configureStore from 'desktop/apps/auction2/utils/configureStore'
import mediator from 'desktop/lib/mediator.coffee'

// Rehydrate data from Server
const user = CurrentUser.orNull()
const bootstrapData = window.__BOOTSTRAP__
const auctionModel = new Auction(bootstrapData.auction)

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

/**
 * Setup Clock, Calendar and ActiveBids Backbone views.
 *
 * TODO: Refactor these into React components
 */
function setupBackboneViews () {
  const {
    id,
    is_open,
    is_live_open
  } = bootstrapData.auction

  const showMyActiveBids = is_open && !is_live_open

  // Clock
  new ClockView({
    modelName: 'Auction',
    model: auctionModel,
    el: $('.auction-clock')
  }).start()

  // Add to calendar
  new AddToCalendar({
    el: $('.auction-callout')
  })

  // Active Bids
  if (showMyActiveBids) {
    new MyActiveBids({
      user: user,
      el: $('#my-active-bids'),
      saleId: id
    }).start()
  }
}

// Store
const store = configureStore(auctionReducer, {
  auctionArtworks: bootstrapData.auctionArtworks
})

// Store model on bootstrap data as we need access to Sale Backbone methods
bootstrapData.auction = auctionModel

/**
 * Mount app and start
 */

ReactDOM.render(
  <App
    {...bootstrapData}
    store={store}
  />,
  document.getElementById('react-root')
)

maybeShowRegistration()
setupBackboneViews()
