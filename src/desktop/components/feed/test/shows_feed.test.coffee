_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'ShowsFeed', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      ShowsFeed = benv.require resolve __dirname, '../client/shows_feed'
      ShowsFeed.__set__ 'PartnerShowButtons', @PartnerShowButtons = sinon.stub()
      ShowsFeed::initialize = sinon.stub()
      model = new Backbone.Model
      model.childModel = new Backbone.Model fabricate 'show', id: 'gagosian'
      @view = new ShowsFeed
      @view.latestItems = new Backbone.Collection [model]
      done()

  afterEach ->
    benv.teardown()

  describe '#handleDoneFetching', ->

    it 'inits a show button for each show', ->
      @view.handleDoneFetching()
      @PartnerShowButtons.calledWithNew.should.be.ok()

    it 'syncs follows from the show ids', ->
      @view.followProfiles = syncFollows: sinon.stub()
      @view.handleDoneFetching()
      @view.followProfiles.syncFollows.args[0][0][0].should.equal 'gagosian'
