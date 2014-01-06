benv      = require 'benv'
Backbone  = require 'backbone'
sinon     = require 'sinon'
StepView  = require '../../client/views/step'

describe 'StepView', ->
  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new StepView(state: { trigger: (@advanceStub = sinon.stub()) }, user: true)

  describe '#initialize', ->
    it 'has a user', ->
      @view.user.should.be.ok

  describe '#advance', ->
    it 'triggers the state transition', ->
      @view.advance($.Event('click'))
      @view.state.trigger.args[0][0].should.equal 'transition:next'
