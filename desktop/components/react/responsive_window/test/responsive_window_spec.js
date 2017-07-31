import jsdom from 'jsdom-global'
const cleanup = jsdom()
import React from 'react'
import ResponsiveWindow, { responsiveWindowAction, responsiveWindowReducer } from '../index'
import sinon from 'sinon'
import { createStore } from 'redux'
import { mount } from 'enzyme'

describe('components/react/responsive_window_spec.js', () => {
  after((done) => {
    cleanup()
    done()
  })

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

  describe('<ResponsiveWindow />', (done) => {
    it('triggers store dispatch on mount', () => {
      const store = createStore(responsiveWindowReducer)
      store.dispatch = sinon.spy()
      sinon.spy(ResponsiveWindow.prototype, 'componentDidMount')

      mount(
        <ResponsiveWindow store={store}>
          <div />
        </ResponsiveWindow>
      )

      // Debounce
      setTimeout(() => {
        ResponsiveWindow.prototype.componentDidMount.calledOnce.should.eql(true)
        store.dispatch.calledOnce.should.eql(true)
        done()
      }, 0)
    })
  })
})
