import sinon from 'sinon'

describe('Recording an artwork view', () => {
  let rewire
  let rewires = []
  let user = null
  let metaphysics

  beforeEach(() => {
    rewire = require('rewire')('../components/record_artwork_view')
  })

  afterEach(() => {
    rewires.forEach((reset) => reset())
  })

  it('records an artwork view for a user', () => {
    user = { accessToken: 'token' }
    metaphysics = sinon.stub().returns(Promise.resolve())
    rewires.push(rewire.__set__('metaphysics', metaphysics))
    rewire.recordArtworkView('artwork_id', user)
    metaphysics.callCount.should.equal(1)
    metaphysics.args[0][0].variables.artwork_id.should.equal('artwork_id')
    metaphysics.args[0][0].query.should.containEql('recordArtworkView')
  })

  it('doesnt record anything with no user', () => {
    metaphysics = sinon.stub()
    rewires.push(rewire.__set__('metaphysics', metaphysics))
    rewire.recordArtworkView('artwork_id', null)
    metaphysics.callCount.should.equal(0)
  })
})
