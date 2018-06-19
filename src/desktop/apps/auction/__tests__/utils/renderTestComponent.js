// Include JSDom if running from Mocha. Jest automatically injects.
const isMocha = typeof jest === 'undefined'
if (isMocha) {
  require('jsdom-global/register')
}

import Articles from 'desktop/collections/articles.coffee'
import Auction from 'desktop/models/auction.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import React from 'react'
import auctions from 'desktop/apps/auction/reducers'
import bootstrap from 'desktop/apps/auction/__tests__/fixtures/auction'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { isEmpty } from 'underscore'
import { merge, cloneDeep } from 'lodash'
import { mount, render, shallow } from 'enzyme'

export default function renderTestComponent({
  Component,
  data = {},
  props = {},
  options = {},
  store = {},
}) {
  const reduxData = merge(cloneDeep(bootstrap), data)
  const auctionModel = new Auction(reduxData.app.auction)
  const auctionArticles = new Articles(reduxData.app.articles)

  reduxData.app.user = CurrentUser.orNull()
  reduxData.app.auction = auctionModel
  reduxData.app.articles = auctionArticles

  store = !isEmpty(store)
    ? store
    : createStore(auctions, reduxData, applyMiddleware(thunk))

  let renderMode
  switch (options.renderMode) {
    // Full DOM
    case 'mount':
      renderMode = mount
      break
    // Static HTML
    case 'render':
      renderMode = render
      break
    case 'shallow':
      renderMode = shallow
      break
    default:
      renderMode = mount
  }

  const wrapper = renderMode(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )

  return {
    store,
    wrapper,
  }
}
