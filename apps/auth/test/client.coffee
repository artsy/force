_         = require 'underscore'
benv      = require 'benv'
rewire    = require 'rewire'
Backbone  = require 'backbone'
sinon     = require 'sinon'
mediator  = require '../../../lib/mediator.coffee'

{ resolve } = require 'path'

describe 'AuthModalRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after -> benv.teardown()

  beforeEach (done) ->
    benv.render resolve(__dirname, '../template.jade'), { sd: {} }, =>
      { AuthModalRouter, @init } = mod = rewire '../client'
      mod.__set__ 'AuthModalView', Backbone.View
      @router = new AuthModalRouter
      done()

  describe '#initialize', ->
    it 'triggers the root path when the modal is closed', ->
      navigateSpy = sinon.spy @router, 'navigate'
      mediator.trigger 'modal:closed'
      navigateSpy.args[0][0].should.equal '/'

  describe '#openAuth', ->
    it 'opens a modal', ->
      Backbone.history.fragment = 'log_in'
      @router.openAuth()
      @router.modal.$el.length.should.be.ok

    it 'does not open a modal if there is already a listener that can take care of it', ->
      mediator.on 'open:auth', -> #
      Backbone.history.fragment = 'log_in'
      @router.openAuth()
      _.isUndefined(@router.modal).should.be.ok
