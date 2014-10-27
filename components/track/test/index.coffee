benv = require 'benv'
sinon = require 'sinon'
analytics = require '../../../lib/analytics'
deprecatedTrack = analytics.track
deprecatedSnowplow = analytics.snowplowStruct
track = require '../index'

describe 'track', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose
        mixpanel: @mixpanel = track: sinon.stub()
        snowplow: @snowplow = sinon.stub()
        ga: @ga = sinon.stub()
      done()

  afterEach ->
    benv.teardown()

  describe 'Mixpanel, GA', ->
    it 'provides unified API that sends the same data as the deprecated track fn (1)', ->
      track action: 'click', description: 'I clicked a button', id: '1', label: 'foobar:1'
      deprecatedTrack.click 'I clicked a button', id: '1', label: 'foobar:1'
      @mixpanel.track.args[0].should.eql @mixpanel.track.args[1]
      @ga.args[0].should.eql @ga.args[1]
      @snowplow.called.should.be.false

    it 'provides unified API that sends the same data as the deprecated track fn (2)', ->
      track action: 'hover', description: 'I hovered a button'
      deprecatedTrack.click 'I hovered a button'
      @mixpanel.track.args[0].should.eql @mixpanel.track.args[1]
      @ga.args[0].should.eql @ga.args[1]
      @snowplow.called.should.be.false

    it 'provides unified API that sends the same data as the deprecated track fn (3)', ->
      deprecatedTrack.funnel 'Sent show inquiry', label: analytics.modelNameAndIdToLabel('show', 'theshowid')
      track action: 'funnel', description: 'Sent show inquiry', label: analytics.modelNameAndIdToLabel('show', 'theshowid')
      @mixpanel.track.args[0].should.eql @mixpanel.track.args[1]
      @ga.args[0].should.eql @ga.args[1]
      @snowplow.called.should.be.false

  describe 'Snowplow', ->
    it 'provides unified API that sends the same data as the deprecated snowplowStruct fn (1)', ->
      deprecatedSnowplow 'inquiry_introduction', 'click', 'theartworkid', 'artwork'
      track
        category: 'inquiry_introduction'
        action: 'click'
        label: 'theartworkid'
        property: 'artwork'
      @snowplow.args[0].should.eql @snowplow.args[1]
      @ga.called.should.be.false
      @mixpanel.track.called.should.be.false

    it 'provides unified API that sends the same data as the deprecated snowplowStruct fn (2)', ->
      analytics.snowplowStruct 'inquiry', 'submit', 'theshowid', 'show', '0.0', { inquiry: { inquiry_id: 'theinquiryid' } }
      track
        category: 'inquiry'
        action: 'submit'
        label: 'theshowid'
        property: 'show'
        value: '0.0'
        contexts: inquiry: inquiry_id: 'theinquiryid'
      @snowplow.args[0].should.eql @snowplow.args[1]
      @ga.called.should.be.false
      @mixpanel.track.called.should.be.false
