_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
fabricate = require '../../../../test/helpers/fabricate'
CurrentUser = require '../../../../models/current_user.coffee'
benv = require 'benv'
{ resolve } = require 'path'

describe 'PersonalizeRouter', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}
      }, =>
        { @PersonalizeRouter } = mod = benv.require resolve(__dirname, '../../client/router')
        mod.__set__ 'views', {
          CollectView: Backbone.View,
          LocationView: Backbone.View,
          ArtistsView: Backbone.View,
          PriceRangeView: Backbone.View
        }
        @router = new @PersonalizeRouter(user: new CurrentUser(fabricate 'user'))
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#step', ->
    it 'should call #teardown', ->
      spy = sinon.spy @router, 'teardown'
      @router.step 'collect'
      spy.called.should.be.ok()

    it 'should set the current_step of state', ->
      @router.step 'collect'
      @router.state.get('current_step').should.equal 'collect'

  describe '#next', ->
    it 'should navigate to the current_step', ->
      @router.state.set 'current_step', 'price_range'
      spy = sinon.spy @router, 'navigate'
      @router.next()
      spy.args[0].should.containEql '/personalize/price_range'
