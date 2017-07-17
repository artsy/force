import 'jsdom-global/register'
import React from 'react'
import DOM from '../DOM'
import auctions from 'desktop/apps/auction2/reducers'
import sinon from 'sinon'
import { createStore } from 'redux'
import { mount } from 'enzyme'

describe('auction/components/DOM.test', () => {
  describe('<DOM />', () => {
    let store

    function setup (data = {}) {
      store = createStore(auctions, data)

      const wrapper = mount(
        <DOM store={store}>
          <div>
            <div className='.artsy-checkbox' />
            <div className='.auction2-page-artowrks' />
            <div className='.js-register-button' />
          </div>
        </DOM>
      )

      return wrapper
    }

    it('registers event listeners', () => {
      const wrapper = setup()
    })
  })
})
