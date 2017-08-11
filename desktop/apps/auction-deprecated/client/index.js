import $ from 'jquery'
import AddToCalendar from '../../../components/add_to_calendar/index.coffee'
import Auction from '../../../models/auction.coffee'
import ClockView from '../../../components/clock/view.coffee'
import ConfirmRegistrationModal from '../../../components/credit_card/client/confirm_registration.coffee'
import CurrentUser from '../../../models/current_user.coffee'
import MyActiveBids from '../../../components/my_active_bids/view.coffee'
import mediator from '../../../lib/mediator.coffee'
import mountAuctionBlock from '../../../components/react/auction_block/index'
import { data as sd } from 'sharify'
import { setupCommercialFilter } from './commercial_filter'

export default () => {
  const auction = new Auction(sd.AUCTION)
  const user = sd.CURRENT_USER ? new CurrentUser(sd.CURRENT_USER) : null

  // If we are on the confirm-registration path then pop up a modal
  // Page is otherwise unchanged
  if (window.location.pathname.match('/confirm-registration') && user) {
    new ConfirmRegistrationModal({ auction: auction })
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

  // Render my active bids if a user is present and
  // the auction is open and not in live integration mode
  if (user && sd.AUCTION && sd.AUCTION.is_open && sd.AUCTION.is_live_open === false) {
    const myActiveBidsTemplate = require('../templates/my_active_bids.jade')
    const activeBids = new MyActiveBids({
      user: user,
      el: $('.auction-my-active-bids'),
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
