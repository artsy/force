_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ mediator } = require '../../../../../../lib/mediator'

describe 'BrowseRouter', ->

  beforeEach ->
    benv.setup =>
      benv.expose { $: benv.require('jquery') }
      FilterRouter = benv.require resolve(__dirname, '../router.coffee')
      FilterRouter.__set__ 'FairBrowseView', @FairBrowseView = sinon.stub()
      sinon.stub Backbone.history, 'start'
      fair = new Backbone.Model
      fair.nameSansYear = sinon.stub().returns('Armory Fair')
      fair.href = sinon.stub().returns('armory-fair')
      sinon.spy mediator, 'trigger'
      @router = new FilterRouter
        fair: fair
        profile: new Backbone.Model
      @router.boothParams = new Backbone.Model
      @router.artworkParams = new Backbone.Model

  afterEach ->
    benv.teardown()
    mediator.trigger.restore()
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

  describe '#signup', ->
    it 'opens the mediator with expected args', ->
      @router.signup 'foo'
      mediator.trigger.args[0][0].should.equal 'open:auth'
      mediator.trigger.args[0][1].should.match {
        mode: 'signup',
        intent: 'signup',
        copy: 'Sign up to receive updates about Armory Fair',
        destination: 'armory-fair/capture/attendee'
      }
