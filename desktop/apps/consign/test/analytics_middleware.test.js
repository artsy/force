// NOTE: Required to enable rewire hooks in tests
// TODO: Refactor with jest
// FIXME: Rewire
const analyticsMiddleware = require('rewire')('../client/analytics_middleware')
import reducers from '../client/reducers'
import { applyMiddleware, createStore } from 'redux'
import sinon from 'sinon'

describe('analytics middleware', () => {
  let triggerStub

  beforeEach(() => {
    triggerStub = sinon.spy()
    analyticsMiddleware.__set__('analyticsHooks', {
      trigger: triggerStub,
    })
  })

  it('tracks a login', () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: 'UPDATE_USER',
      payload: {
        user: { id: 'sarah', email: 'sarah@test.com' },
        accountCreated: false,
      },
    })

    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('consignment:account:created')
    analyticsArgs[1].should.containEql({
      id: 'sarah',
      email: 'sarah@test.com',
      accountCreated: false,
    })
  })

  it('tracks a signup', () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: 'UPDATE_USER',
      payload: {
        user: { id: 'sarah', email: 'sarah@test.com' },
        accountCreated: true,
      },
    })

    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('consignment:account:created')
    analyticsArgs[1].should.containEql({
      id: 'sarah',
      email: 'sarah@test.com',
      accountCreated: true,
    })
  })

  it('tracks an artist confirmed action', () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: 'UPDATE_ARTIST_ID',
      payload: { artistId: 'andy-warhol' },
    })
    store.dispatch({ type: 'SUBMIT_ARTIST' })

    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('consignment:artist:confirmed')
    analyticsArgs[1].should.containEql({
      artistId: 'andy-warhol',
    })
  })

  it('tracks an error on submission creation', () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: 'SUBMISSION_ERROR',
      payload: { errorType: 'convection_create' },
    })

    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('consignment:submission:error')
    analyticsArgs[1].should.containEql({
      type: 'convection_create',
      errors: 'Error creating submission',
    })
  })

  it('tracks an error on submission completion', () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: 'SUBMISSION_ERROR',
      payload: { errorType: 'convection_complete_submission' },
    })

    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('consignment:submission:error')
    analyticsArgs[1].should.containEql({
      type: 'convection_complete_submission',
      errors: 'Error completing submission',
    })
  })

  it('tracks a submission created with no assets', () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: 'SUBMISSION_CREATED',
      payload: { submissionId: 123 },
    })

    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('consignment:submitted')
    analyticsArgs[1].should.containEql({
      submissionId: 123,
    })
  })

  it('tracks a submission completed with no assets', () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: 'UPDATE_SUBMISSION',
      payload: { submission: { id: 123 } },
    })
    store.dispatch({ type: 'SUBMISSION_COMPLETED' })

    triggerStub.callCount.should.eql(1)
    const analyticsArgs = triggerStub.firstCall.args
    analyticsArgs[0].should.eql('consignment:completed')
    analyticsArgs[1].should.containEql({
      submissionId: 123,
      assetIds: [],
    })
  })
})
