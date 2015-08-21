rewire = require 'rewire'
_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Fair = require '../../../models/fair.coffee'
Fairs = require '../../../collections/fairs.coffee'
Profile = require '../../../models/profile.coffee'
{ FairsView } = benv.requireWithJadeify resolve(__dirname, '../client/index.coffee'), [
  'pastFairsTemplate'
]

describe 'FairsView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      sinon.stub(Fair.prototype, 'isPast').returns(true)
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    fair = new Fair fabricate 'fair'
    fair.related().profile = new Profile fabricate 'fair_profile'
    @fairs = new Fairs [fair]
    benv.render resolve(__dirname, '../templates/index.jade'), {
      sd: FAIRS: @fairs
      featuredFairs: @fairs.models
      currentFairRows: @fairs.currentRows()
      upcomingFairs: @fairs.models
      pastFairs: @fairs.models
      asset: (->)
    }, =>
      @view = new FairsView
        el: $('body')
        collection: @fairs
        user: null
      done()

  describe '#renderPastFairs', ->

    beforeEach ->
      @view.initialize({ el: $('body'), fair: @fair })

    it 'appends the additional fair(s)', (done)->
      @view.$('.fairs__past-fairs-list a').length.should.eql 1
      @view.renderPastFairs @fairs, [fabricate('fair')]
      Backbone.sync.args[0][1].id.should.eql 'the-armory-show'
      Backbone.sync.args[0][2].success()
      _.defer =>
        @view.$('.fairs__past-fairs-list a').length.should.eql 2
        done()



