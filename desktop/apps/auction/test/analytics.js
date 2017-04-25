import analyticsMiddleware from '../client/analytics'
import sinon from 'sinon'

describe('analytics middleware', () => {
  it ('returns empty string without title or year', () => {
    const fakeStore = {}
    const fakeNext = sinon.spy()
    const action = { type: 'UPDATE_MEDIUM_ID' }
    analyticsMiddleware(fakeStore)(fakeNext)(action)

    assert.ok(next.withArgs(action).calledOnce)
  })
})