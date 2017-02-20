_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'BrowseRouter', ->

  beforeEach ->
    benv.setup =>
      benv.expose { $: benv.require('jquery') }
      FilterRouter = benv.require resolve(__dirname, '../router.coffee')
      FilterRouter.__set__ 'FairBrowseView', @FairBrowseView = sinon.stub()
      sinon.stub Backbone.history, 'start'
      @router = new FilterRouter
        fair: new Backbone.Model
        profile: new Backbone.Model
      @router.boothParams = new Backbone.Model
      @router.artworkParams = new Backbone.Model

  afterEach ->
    benv.teardown()
    Backbone.history.start.restore()

  describe '#initialize', ->

    it 'adds the browse view', ->
      @FairBrowseView.calledWithNew.should.be.ok()

  describe '#artist', ->

    it 'sets the booths scoped to artist', ->
      @router.artist '', 'foo'
      @router.boothParams.get('artist').should.equal 'foo'

  describe '#booths', ->

    it 'triggers a change to get the booth going', ->
      @router.boothParams.on 'change', spy = sinon.spy()
      @router.booths '', 'foo'
      spy.called.should.be.ok()

  describe '#boothsSection', ->

    it 'sets the section', ->
      @router.boothsSection '', 'foo'
      @router.boothParams.get('section').should.equal 'foo'

  describe '#boothsRegion', ->

    it 'sets the region', ->
      @router.boothsRegion '', 'foo'
      @router.boothParams.get('region').should.equal 'foo'
