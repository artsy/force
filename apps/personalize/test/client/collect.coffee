_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user.coffee'
{ fabricate }     = require 'antigravity'
{ resolve }       = require 'path'

describe 'CollectView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$    = $
      @CollectView  = benv.requireWithJadeify resolve(__dirname, '../../client/views/collect'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @state  = new PersonalizeState
    @user   = new CurrentUser fabricate 'user'
    @view   = new @CollectView(state: @state, user: @user)
    @view.render()

  describe '#setCollectorLevel', ->
    it 'sets the collector level when the button is clicked', ->
      @view.$('a').eq(0).click()
      @view.user.get('collector_level').should.equal 3

    it 'sets the level of PersonalizeState', ->
      @view.$('a').eq(1).click()
      @view.state.get('current_level').should.equal 2

  describe '#render', ->
    it 'renders the template', ->
      html = @view.$el.html()
      _.each @state.get('levels'), (level) ->
        html.should.include level
