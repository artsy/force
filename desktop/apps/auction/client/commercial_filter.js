import { data as sd } from 'sharify'
import JumpView from '../../../components/jump/view.coffee'
import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import auctions from './reducers'
import AuctionPage from '../components/auction_page'
import * as actions from './actions'

export function setupCommercialFilter() {
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
  function infiniteScroll() {
    const threshold = $(window).height() + $(window).scrollTop()
    const artworksEl = $('.auction-page-artworks')
    const shouldFetch = artworksEl.height() > 0
      && threshold > artworksEl.offset().top + artworksEl.height()
    if (shouldFetch) { store.dispatch(actions.infiniteScroll()) }
  }
  $(window).on('scroll.auction-page-artworks', _.throttle(infiniteScroll, 200))
}
