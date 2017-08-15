import 'jsdom-global/register'
import React from 'react'
import auctions from 'desktop/apps/auctions2/reducers'
import bootstrap from 'desktop/apps/auctions2/__tests__/fixtures/currentAuctions'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { isEmpty } from 'underscore'
import { merge, cloneDeep } from 'lodash'
import { mount, render, shallow } from 'enzyme'

export default function renderTestComponent ({ Component, data = {}, props = {}, options = {}, store = {} }) {
  const reduxData = merge(cloneDeep(bootstrap), data)

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
    wrapper
  }
}
