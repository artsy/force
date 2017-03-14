import Auction from '../../models/auction.coffee'
import CurrentUser from '../../models/current_user.coffee'
import Artist from '../../models/artist.coffee'
import ClockView from '../../components/clock/view.coffee'
import { data as sd } from 'sharify'
import _ from 'underscore'
import MyActiveBids from '../../components/my_active_bids/view.coffee'
import Backbone from 'backbone'

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
import CommercialFilter from './components/commercial_filter'
import * as actions from './actions'

const myActiveBidsTemplate = require('./templates/my_active_bids.jade')

const auction = new Auction(_.pick(sd.AUCTION, 'start_at', 'live_start_at', 'end_at'))
const user = sd.CURRENT_USER ? new CurrentUser(sd.CURRENT_USER) : null

const clock = new ClockView({
  modelName: 'Auction',
  model: auction,
  el: $('.auction2-clock')
})
clock.start()

if (sd.AUCTION && sd.AUCTION.is_live_open == false) {
  const activeBids = new MyActiveBids({
    user: user,
    el: $('.auction2-my-active-bids'),
    template: myActiveBidsTemplate,
    saleId: auction.get('_id')
  })
  activeBids.start()
}

// Commercial filtering
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
    <CommercialFilter />
  </Provider>,
  document.getElementById('cf-artworks')
)

store.dispatch(actions.fetchArtworks())

// scroll up if you select a checkbox or sort
function scrollToTop() {
  $('html,body').animate( {
    scrollTop: $('.auction2-my-active-bids').offset().top - $('.mlh-navbar').height()
  }, 400)
}

$('body').on('click', '.artsy-checkbox', () => scrollToTop())
$('body').on('click', '.bordered-pulldown-options a', (e) => {
  e.preventDefault()
  $('.bordered-pulldown-options').hidehover()
  scrollToTop()
})

// jump view
const jump = new JumpView({
  threshold: $(window).height(),
  direction: 'bottom',
  position: $('.auction2-my-active-bids').offset().top - $('.mlh-navbar').height()
})
$('body').append(jump.$el)

jump.scrollToPosition($('.mlh-navbar').offset().top)

// infinite scroll
function infiniteScroll() {
  const threshold = $(window).height() + $(window).scrollTop()
  const artworksEl = $('.auction2-artworks')
  const shouldFetch = artworksEl.height() > 0
    && threshold > artworksEl.offset().top + artworksEl.height()
  if (shouldFetch) { store.dispatch(actions.infiniteScroll()) }
}

$(window).on('scroll.auction2-artworks', _.throttle(infiniteScroll, 200))
