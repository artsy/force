import { responsiveWindowAction, responsiveWindowReducer } from '../index'
import { createStore } from 'redux'

describe('components/react/responsiveWindow.test.js', () => {
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
})
