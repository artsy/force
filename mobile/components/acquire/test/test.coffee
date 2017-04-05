benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'

describe 'AcquireArtwork Component', ->

  before (done) ->
    benv.setup =>
      @acquireArtwork = require('../view').acquireArtwork
      @_location = global.location
      global.location = {}
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    global.location = @_location
    benv.teardown()

  describe '#acquireArtwork', ->

    beforeEach ->
      sinon.stub Backbone, 'sync'
      @target = { removeClass: -> }
      @editionSetId = null
      @artwork = new Backbone.Model(id: 'artwork-id')

    afterEach ->
      Backbone.sync.restore()

    it 'redirects to correct order resume url', ->
      @acquireArtwork(@artwork, @target, @editionSetId)
      Backbone.sync.args[0][2].success
        id: 'order-id'
        token: 'order-token'

      location.href.should.containEql '/order/order-id/resume?token=order-token'
