import $ from 'jquery'
import * as actions from './actions'
import _ from 'underscore'
import AuctionPage from '../components/auction_page'
import JumpView from 'desktop/components/jump/view.coffee'
import React from 'react'
import analyticsMiddleware from './analytics_middleware'
import auctions from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { data as sd } from 'sharify'
import { render } from 'react-dom'

export function setupCommercialFilter () {
  const middleware = []

  middleware.push(thunkMiddleware) // lets us dispatch() functions
  middleware.push(analyticsMiddleware) // middleware to help us track previous and future states

  if (sd.NODE_ENV === 'development' || sd.NODE_ENV === 'staging') {
    middleware.push(createLogger({ // middleware that logs actions
      collapsed: true
    }))
  }

  const store = createStore(
    auctions,
    applyMiddleware(...middleware)
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
  function scrollToTop () {
    $('html,body').animate({
      scrollTop: $('.auction-artworks-header').offset().top - $('.mlh-navbar').height()
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
    element: $('.auction-artworks-header'),
    offset: $('.mlh-navbar')
  })
  $('body').append(jump.$el)
  jump.scrollToPosition(0)

  // infinite scroll
  function infiniteScroll () {
    const threshold = $(window).height() + $(window).scrollTop()
    const artworksEl = $('.auction-page-artworks')
    const shouldFetch = artworksEl.height() > 0 &&
                        threshold > artworksEl.offset().top + artworksEl.height()
    if (shouldFetch) {
      store.dispatch(actions.infiniteScroll())
    }
  }
  $(window).on('scroll.auction-page-artworks', _.throttle(infiniteScroll, 200))
}
