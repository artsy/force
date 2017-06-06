import 'jsdom-global/register'
import React from 'react'
import ResponsiveWindow, { responsiveWindowAction, responsiveWindowReducer } from '../index'
import sinon from 'sinon'
import { createStore } from 'redux'
import { mount } from 'enzyme'

describe('components/react/responsive_window_spec.js', () => {
  it('when desktop, isMobile is false', () => {
    const store = createStore(responsiveWindowReducer)
    store.dispatch(responsiveWindowAction(1000))
    store.getState().isMobile.should.eql(false)
  })

  it('when mobile, isMobile is true', () => {
    const store = createStore(responsiveWindowReducer)
    store.dispatch(responsiveWindowAction(500))
    store.getState().isMobile.should.eql(true)
  })

  describe('<ResponsiveWindow />', () => {
    it('triggers store dispatch on mount', () => {
      const store = createStore(responsiveWindowReducer)
      store.dispatch = sinon.spy()
      sinon.spy(ResponsiveWindow.prototype, 'componentDidMount')

      mount(
        <ResponsiveWindow store={store}>
          <div />
        </ResponsiveWindow>
      )

      ResponsiveWindow.prototype.componentDidMount.calledOnce.should.eql(true)
      store.dispatch.calledOnce.should.eql(true)
    })
  })
})
