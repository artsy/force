// import React from 'react'
// import ReactDOM from 'react-dom'
// import Index from 'desktop/apps/auction2/components/server/index'
//
// ReactDOM.render(<Index />, document.getElementById('react-root'), () => {
//   console.log('working!')
// })

import $ from 'jquery'
import AddToCalendar from 'desktop/components/add_to_calendar/index.coffee'
import Auction from 'desktop/models/auction.coffee'
import ClockView from 'desktop/components/clock/view.coffee'
import ConfirmRegistrationModal from 'desktop/components/credit_card/client/confirm_registration.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import MyActiveBids from 'desktop/components/my_active_bids/view.coffee'
import mediator from 'desktop/lib/mediator.coffee'
import mountAuctionBlock from 'desktop/components/react/auction_block/index'
import { data as sd } from 'sharify'
import { setupCommercialFilter } from './components/commercialFilter'

export default () => {
  const auction = new Auction(sd.AUCTION)
  const user = CurrentUser.orNull()

  // If we are on the confirm-registration path then pop up a modal Page is
  // otherwise unchanged
  if (user && location.pathname.match('/confirm-registration')) {
    new ConfirmRegistrationModal({
      auction
    })
  }

  const clock = new ClockView({
    modelName: 'Auction',
    model: auction,
    el: $('.auction-clock')
  })
  clock.start()

  new AddToCalendar({
    el: $('.auction-callout')
  })

  // render the associated auction if there is one
  const sale = auction.get('associated_sale')

  if (sale) {
    mountAuctionBlock({
      relatedAuction: true,
      sale
    }, '#associated-sale')
  }

  // Render my active bids if a user is present and the auction is open and not
  // in live integration mode
  if (user && sd.AUCTION && sd.AUCTION.is_open && sd.AUCTION.is_live_open === false) {
    const myActiveBidsTemplate = require('desktop/apps/auction2/components/server/my_active_bids.jade')
    const activeBids = new MyActiveBids({
      user: user,
      el: $('#my-active-bids'),
      template: myActiveBidsTemplate,
      saleId: sd.AUCTION.id
    })
    activeBids.start()
  }

  // Commercial filtering (redux-powered) if there are artworks
  if (sd.AUCTION && sd.AUCTION.eligible_sale_artworks_count && sd.AUCTION.eligible_sale_artworks_count > 0) {
    setupCommercialFilter()
  }

  // ask people to log in before registering
  $('body').on('click', '.js-register-button', (e) => {
    if (!user) {
      e.preventDefault()
      mediator.trigger(
        'open:auth',
        { mode: 'register', redirectTo: $(e.target).attr('href') }
      )
    }
  })
}
