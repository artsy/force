benv      = require 'benv'
analytics = require '../../../lib/analytics'
Artwork   = require '../../../models/artwork'
sinon     = require 'sinon'
Backbone  = require 'backbone'
sd        = require('sharify').data
impressionTracking = require '../impression_tracking'

describe 'ImpressionTracking', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sd.GOOGLE_ANALYTICS_ID = 'goog that analytics'
      @gaStub = sinon.stub()
      analytics ga: @gaStub, location: { pathname: 'foobar' }
      done()

  after ->
    benv.teardown()

  describe "Tracking", ->

    it "should fire tracking events", (done) ->
      impressionTracking.trackArtworkImpressions [new Artwork(id: 'warhol')], { length: 1, offset: -> { top: 0 } }
      $(window).trigger 'scroll'
      setTimeout =>
        @gaStub.args[1][0].should.equal 'send'
        @gaStub.args[1][1].should.equal 'event'
        @gaStub.args[1][2].should.equal 'Multi-object Events'
        @gaStub.args[1][3].should.equal 'Impression'
        @gaStub.args[1][4].should.equal 'Artwork:5ef1fd34'
        done()
      , 1000
