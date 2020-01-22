rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'
ArtworkInquiry = require '../../../models/artwork_inquiry'
analytics = rewire '../analytics'

describe 'analytics proxy', ->
  beforeEach ->
    @hooks = analytics.__get__ 'analyticsHooks'
    sinon.stub @hooks, 'trigger'

    @context =
      modal: on: sinon.stub(), off: sinon.stub()
      user: new CurrentUser fabricate 'user'
      artwork: new Artwork fabricate 'artwork'
      inquiry: @inquiry = new ArtworkInquiry
      collectorProfile: new Backbone.Model
      userInterests: new Backbone.Model
      state: new Backbone.Model
      foo: 'not eventable'

    analytics.attach @context

  afterEach ->
    @hooks.trigger.restore()
    analytics.teardown @context

  describe '#attach', ->
    it 'proxies all the events with a namespace', ->
      @inquiry.trigger 'sync'

      # Proxies the namespaced event over hooks
      @hooks.trigger.callCount.should.equal 1
      @hooks.trigger.args[0][0]
        .should.equal 'inquiry_questionnaire:inquiry:sync'

      # Passes the complete context
      Object.keys(@hooks.trigger.args[0][1]).should.eql [
        'modal'
        'user'
        'artwork'
        'inquiry'
        'collectorProfile'
        'userInterests'
        'state'
        'foo'
      ]
