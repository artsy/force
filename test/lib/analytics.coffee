analytics = require '../../lib/analytics'
sinon = require 'sinon'
sd = require('sharify').data

describe 'analytics', ->

  beforeEach ->
    sd.MIXPANEL_ID = 'mix that panel'
    sd.GOOGLE_ANALYTICS_ID = 'goog that analytics'
    @mixpanelStub = {}
    @mixpanelStub.track = sinon.stub()
    @mixpanelStub.init = sinon.stub()
    @gaStub = sinon.stub()
    analytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }

  describe 'initialize function', ->

    it 'initializes mixpanel with the MIXPANEL_ID', ->
      @mixpanelStub.init.args[0][0].should.equal 'mix that panel'

    it 'inits ga with the GOOGLE_ANALYTICS_ID', ->
      @gaStub.args[0][0].should.equal 'create'
      @gaStub.args[0][1].should.equal 'goog that analytics'

  describe '#trackPageview', ->

    it 'sends a pageview in mixpanel', ->
      analytics.trackPageview()
      @mixpanelStub.track.args[0][0].should.equal 'Viewed page'
      @mixpanelStub.track.args[0][1].path.should.equal 'foobar'

    it 'sends a google pageview', ->
      analytics.trackPageview()
      @gaStub.args[1][0].should.equal 'send'
      @gaStub.args[1][1].should.equal 'pageview'

    it 'doesnt let failed analytics mess up js code', ->
      analytics mixpanel: null, ga: null, location: { pathname: 'foobar' }
      analytics.trackPageview()
