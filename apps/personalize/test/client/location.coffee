_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user.coffee'
{ fabricate }     = require 'antigravity'
{ resolve }       = require 'path'

describe 'LocationView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$      = $
      @LocationView   = benv.requireWithJadeify resolve(__dirname, '../../client/views/location'), ['template']
      @LocationView.__set__ 'LocationSearchView', Backbone.View
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @location   = require '../fixtures/location.coffee'
    @state      = new PersonalizeState
    @user       = new CurrentUser fabricate 'user'
    @view       = new @LocationView(state: @state, user: @user)
    @view.render()

  describe '#update', ->
    it 'sets the location on the user', ->
      @view.update @location
      @view.user.get('location').city.should.equal 'New York'
      @view.user.get('location').state.should.equal 'New York'
      @view.user.get('location').state_code.should.equal 'NY'

    it 'advances', ->
      spy = sinon.spy @view, 'advance'
      @view.update @location
      spy.called.should.be.ok

  describe '#render', ->
    it 'renders the template', ->
      @view.render()
      @view.$el.html().should.include 'Where do you call home?'

    it 'calls #postRender', ->
      spy = sinon.spy @view, 'postRender'
      @view.render()
      spy.called.should.be.ok
