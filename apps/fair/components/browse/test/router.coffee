_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'BrowseRouter', ->

  beforeEach ->
    benv.setup =>
      benv.expose { $: require('jquery')(window) }
      FilterRouter = benv.require '../router.coffee'
      FilterRouter.__set__ 'FairBrowseView', @FairBrowseView = sinon.stub()
      @router = new FilterRouter
        fair: new Backbone.Model
        profile: new Backbone.Model
      @router.boothParams = new Backbone.Model
      @router.artworkParams = new Backbone.Model

  afterEach ->
    benv.teardown()

  describe '#initialize', ->

    it 'adds the browse view', ->
      @FairBrowseView.calledWithNew.should.be.ok

  describe '#artist', ->

    it 'sets the booths scoped to artist', ->
      @router.artist '', 'foo'
      @router.boothParams.get('artist').should.equal 'foo'

  describe '#booths', ->

    it 'triggers a change to get the booth going', ->
      @router.boothParams.on 'change', spy = sinon.spy()
      @router.booths '', 'foo'
      spy.called.should.be.ok

  describe '#boothsSection', ->

    it 'sets the section', ->
      @router.boothsSection '', 'foo'
      @router.boothParams.get('section').should.equal 'foo'

  describe '#boothsRegion', ->

    it 'sets the region', ->
      @router.boothsRegion '', 'foo'
      @router.boothParams.get('region').should.equal 'foo'