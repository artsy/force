import auctions from 'desktop/apps/auction/reducers'
import { applyMiddleware, createStore } from 'redux'
import sinon from 'sinon'

const rewire = require('rewire')('../analyticsMiddleware')
const analyticsMiddleware = rewire.default

describe('analytics middleware', () => {
  let triggerStub

  beforeEach(() => {
    triggerStub = sinon.spy()
    rewire.__set__('analyticsHooks', {
      trigger: triggerStub
    })
  })

  it('tracks changes in mediums', () => {
    const action = { type: 'UPDATE_MEDIUM_ID', payload: { mediumId: 'painting' } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))

    store.dispatch(action)
    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('auction:artworks:params:change')
    analyticsArgs[1].should.containEql({
      current: [
        { artists: [] },
        { medium: ['painting'] },
        { sort: 'position' },
        { price: '' }
      ],
      changed: { medium: 'painting' }
    })
  })

  it('tracks changes in artists', () => {
    const action = { type: 'UPDATE_ARTIST_ID', payload: { artistId: 'andy-warhol' } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))

    store.dispatch(action)
    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('auction:artworks:params:change')
    analyticsArgs[1].should.containEql({
      current: [
        { artists: ['andy-warhol'] },
        { medium: [] },
        { sort: 'position' },
        { price: '' }
      ],
      changed: { artist: 'andy-warhol' }
    })
  })

  it('correctly tracks artists when Artists You Follow is clicked', () => {
    const action = { type: 'UPDATE_ARTIST_ID', payload: { artistId: 'artists-you-follow' } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))

    store.dispatch(action)
    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('auction:artworks:params:change')
    analyticsArgs[1].should.containEql({
      current: [
        { artists: ['artists-you-follow'] },
        { medium: [] },
        { sort: 'position' },
        { price: '' }
      ],
      changed: { artist: 'artists-you-follow' }
    })
  })

  it('tracks changes in price', () => {
    const action = { type: 'UPDATE_ESTIMATE_RANGE', payload: { min: 100, max: 50000 } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))

    store.dispatch(action)
    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('auction:artworks:params:change')
    analyticsArgs[1].should.containEql({
      current: [
        { artists: [] },
        { medium: [] },
        { sort: 'position' },
        { price: '10000-*' }
      ],
      changed: { price: '10000-*' }
    })
  })

  it('tracks changes in sort', () => {
    const action = { type: 'UPDATE_SORT', payload: { sort: 'lot_number' } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))

    store.dispatch(action)
    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('auction:artworks:params:change')
    analyticsArgs[1].should.containEql({
      current: [
        { artists: [] },
        { medium: [] },
        { sort: 'lot_number' },
        { price: '' }
      ],
      changed: { sort: 'lot_number' }
    })
  })

  it('does not track other actions', () => {
    const action = { type: 'TOGGLE_LIST_VIEW', payload: { isListView: true } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))

    store.dispatch(action)
    triggerStub.callCount.should.eql(0)
  })
})
