import _ from 'underscore'
import sinon from 'sinon'
import { recordArtworkView } from 'lib/components/record_artwork_view'

describe('Recording an artwork view', () => {
  let init
  let rewire
  let rewires = []
  let user = null
  const metaphysics = sinon.spy()

  beforeEach(() => {
    rewire = require('rewire')('lib/components/record_artwork_view')
    init = rewire.init
  })

  afterEach(() => {
    rewires.forEach((reset) => reset())
  })

  it('records an artwork view', () => {
    user = { accessToken: 'token' }
    rewire.__set__('metaphysics', metaphysics)
    init()
    recordArtworkView('artwork_id', user)
    metaphysics.callCount.should.equal(1)
  })
})
