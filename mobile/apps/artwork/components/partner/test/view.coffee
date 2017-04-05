_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
FollowProfile = require '../../../../../collections/follow_profiles'
CurrentUser = require '../../../../../models/current_user'
{ fabricate, fabricate2 } = require 'antigravity'
{ resolve } = require 'path'
partner = require './fixture'

describe 'ArtworkPartnerView', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @artwork = fabricate 'artwork'
    @artwork.partner = partner

    benv.render resolve(__dirname, '../index.jade'), {
      artwork: @artwork
      sd: ARTWORK: @artwork
      asset: (->)
    }, =>
      ArtworkPartnerView = rewire '../view.coffee'
      setupFollowButton = sinon.stub()
      sinon.stub Backbone, 'sync'
      @view = new ArtworkPartnerView
        artwork: @artwork
        el: $('.artwork-partner-module')

      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#renderPartnerCities', ->

    it 'displays cities', ->
      @view.renderPartnerCities()
      @view.$('.artwork-partner-location').text().should.equal "New York • Miami"
