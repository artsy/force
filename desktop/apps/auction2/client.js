import AddToCalendar from '../../components/add_to_calendar/index.coffee'
import Artist from '../../models/artist.coffee'
import Auction from '../../models/auction.coffee'
import Backbone from 'backbone'
import ClockView from '../../components/clock/view.coffee'
import CurrentUser from '../../models/current_user.coffee'
import MyActiveBids from '../../components/my_active_bids/view.coffee'
import { data as sd } from 'sharify'
import _ from 'underscore'

// import UrlHandler from '../../components/commercial_filter/url_handler.coffee'
import JumpView from '../../components/jump/view.coffee'

// For react/redux
import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import auctions from './reducers'
import AuctionPage from './components/auction_page'
import * as actions from './actions'

const auction = new Auction(_.pick(sd.AUCTION, 'start_at', 'live_start_at', 'end_at'))
const user = sd.CURRENT_USER ? new CurrentUser(sd.CURRENT_USER) : null

const clock = new ClockView({
  modelName: 'Auction',
  model: auction,
  el: $('.auction2-clock')
})
clock.start()

const calendar = new AddToCalendar({
  el: $('.auction2-callout')
})

// Render my active bids if a user is present and
// the auction is open and not in live integration mode
if (user && sd.AUCTION && sd.AUCTION.is_open && sd.AUCTION.is_live_open === false) {
  const myActiveBidsTemplate = require('./templates/my_active_bids.jade')
  const activeBids = new MyActiveBids({
    user: user,
    el: $('.auction2-my-active-bids'),
    template: myActiveBidsTemplate,
    saleId: sd.AUCTION.id
  })
  activeBids.start()
}

// Commercial filtering (redux-powered)
const loggerMiddleware = createLogger()
const store = createStore(
  auctions,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // middleware that logs actions
  )
)

render(
  <Provider store={store}>
    <AuctionPage />
  </Provider>,
  document.getElementById('cf-artworks')
)
if (sd.CURRENT_USER) {
  store.dispatch(actions.fetchArtworksByFollowedArtists())
}
store.dispatch(actions.fetchArtworks())

// scroll up if you select a checkbox or sort
function scrollToTop() {
  $('html,body').animate( {
    scrollTop: $('.auction2-artworks-header').offset().top - $('.mlh-navbar').height()
  }, 400)
}

$('body').on('click', '.artsy-checkbox', () => scrollToTop())
$('body').on('click', '.bordered-pulldown-options a', (e) => {
  e.preventDefault()
  $('.bordered-pulldown-options').hidehover()
  scrollToTop()
})

// mount jump view
const jump = new JumpView({
  threshold: $(window).height(),
  direction: 'bottom',
  element: $('.auction2-artworks-header'),
  offset: $('.mlh-navbar')
})
$('body').append(jump.$el)
jump.scrollToPosition(0)

// infinite scroll
function infiniteScroll() {
  const threshold = $(window).height() + $(window).scrollTop()
  const artworksEl = $('.auction2-artworks')
  const shouldFetch = artworksEl.height() > 0
    && threshold > artworksEl.offset().top + artworksEl.height()
  if (shouldFetch) { store.dispatch(actions.infiniteScroll()) }
}
$(window).on('scroll.auction2-artworks', _.throttle(infiniteScroll, 200))
