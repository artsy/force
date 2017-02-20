_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'Filter', ->

  before (done) ->
    benv.setup =>
      @Params = require '../../models/params'
      benv.expose
        sd: METAPHYSICS_ENDPOINT: 'http://metaphysics.test'
      done()

  after ->
    benv.teardown()

  describe '#initialParams', ->
    it 'returns the defaults if custom defaults are not passed in', ->
      params = new @Params({}, {})
      defaults = params.initialParams()
      defaults.should.containEql(size: 50, partner_cities: [])

    it 'returns the custom defaults if they are passed in', ->
      params = new @Params({}, { customDefaults: { size: 20, artist_ids: [] } })
      defaults = params.initialParams()
      defaults.should.eql(size: 20, artist_ids: [])
      defaults.should.not.containEql(size: 50)
