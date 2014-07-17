_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../models/current_user.coffee'

describe 'PersonalizeRouter', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      { @PersonalizeRouter, init } = mod = rewire '../../client/index'
      mod.__set__ 'Transition', { fade: (@fadeStub = sinon.stub()) }
      mod.__set__ 'views', { LocationView: => { render: => { $el: 'location' } } }
      sinon.spy @PersonalizeRouter.prototype, 'navigate'
      @router = new @PersonalizeRouter user: new CurrentUser
      done()

  afterEach ->
    @router.navigate.restore()

  after ->
    benv.teardown()

  describe '#step', ->
    it 'steps the view', ->
      step = 'location'
      @router.$el.html = sinon.stub()
      @router.step(step)
      @fadeStub.args[0][1].out() # Trigger the callback
      @router.$el.html.args[0][0].should.equal step
      @router.state.get('current_step').should.equal step

  describe '#next', ->
    it 'triggers the route on the state transition', ->
      @router.state.trigger 'transition:next'
      _.last(@router.navigate.args)[0].should.equal "/personalize/#{@router.state.get('current_step')}"
      _.last(@router.navigate.args)[1].trigger.should.be.ok

  describe '#redirectLocation', ->
    it 'returns the root path if there is no destination cookie set', ->
      @router.redirectLocation().should.equal '/'

    it 'returns the value of the destination cookie if it is present, and clears it', ->
      Cookies = require 'cookies-js'
      Cookies.set 'destination', (destination = '/foo/bar'), expires: 1000
      @router.redirectLocation().should.equal destination
      (Cookies.get('destination')).should.equal 'undefined'

  describe '#done', ->
    it 'sets the $el state to loading, saves the user, redirects', ->
      @router.user = save: sinon.stub()
      @router.$el.attr = sinon.stub()
      @router.state.trigger 'done'

      @router.$el.attr.args[0][0].should.equal 'data-state'
      @router.$el.attr.args[0][1].should.equal 'loading'

      @router.user.save.called.should.be.ok

      window.location.should.equal @router.redirectLocation()
