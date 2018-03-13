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
    it 'returns the defaults', ->
      params = new @Params({}, {})
      defaults = params.initialParams()
      defaults.should.containEql(size: 40, partner_cities: [])
