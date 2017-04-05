_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../../models/current_user'

describe 'PersonalizeRouter', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      location.assign = sinon.stub()
      sinon.stub _, 'defer', (cb) -> cb()
      { @PersonalizeRouter, init } = mod = rewire '../../client/index'
      mod.__set__ 'Transition', fade: (@fadeStub = sinon.stub())
      mod.__set__ 'views', LocationView: => render: => $el: 'location'
      mod.__set__ 'Cookies', @Cookies = set: (->), get: (->), expire: (->)
      sinon.spy @PersonalizeRouter::, 'navigate'
      @router = new @PersonalizeRouter user: new CurrentUser
      done()

  afterEach ->
    _.defer.restore()
    @router.navigate.restore()

  after ->
    benv.teardown()

  describe '#initialize', ->
    beforeEach ->
      @nextSpy = sinon.spy @PersonalizeRouter::, 'next'

    afterEach ->
      @nextSpy.restore()

    it 'calls #next to figure out the initial step', ->
      router = new @PersonalizeRouter user: new CurrentUser
      router.next.called.should.be.true()

  describe '#next', ->
    it 'triggers the route on the state transition', ->
      @router.state.trigger 'transition:next'
      _.last(@router.navigate.args)[0].should.equal "/artsy-primer-personalize/#{@router.state.get('current_step')}"
      _.last(@router.navigate.args)[1].trigger.should.be.ok()

  describe '#redirectLocation', ->
    it 'returns the root path if there is no destination cookie set', ->
      @router.redirectLocation().should.equal '/'

    it 'returns the value of the destination cookie if it is present, and clears it', ->
      @Cookies.get = -> '/foo/bar'
      @router.redirectLocation().should.equal '/foo/bar'

  describe '#done', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'
      Backbone.sync.yields {}

      sinon.stub $, 'post'

    afterEach ->
      Backbone.sync.restore()
      $.post.restore()

    it 'sets the $el state to loading, saves the user, redirects', (done)->
      @router.user = save: sinon.stub()
      @router.$el.attr = sinon.stub()
      @router.state.trigger 'done'

      @router.$el.attr.args[0][0].should.equal 'data-state'
      @router.$el.attr.args[0][1].should.equal 'loading'

      _.delay =>
        @router.user.save.called.should.be.ok()
        location.assign.args[0][0].should.equal @router.redirectLocation()
        done()
      , 10
