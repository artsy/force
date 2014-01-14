benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
StepView          = require '../../client/views/step'
PersonalizeState  = require '../../client/state'

describe 'StepView', ->
  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @state = new PersonalizeState
    @view = new StepView(state: @state, user: true)

  describe '#initialize', ->
    it 'has a user', ->
      @view.user.should.be.ok

  describe '#advance', ->
    it 'triggers the state transition', ->
      sinon.spy @view.state, 'trigger'
      @view.advance($.Event('click'))
      @view.state.trigger.args[0][0].should.equal 'transition:next'
      @view.state.trigger.restore()
