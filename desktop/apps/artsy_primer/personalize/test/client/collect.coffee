_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../../client/state'
CurrentUser = require '../../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'CollectView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @CollectView = benv.requireWithJadeify resolve(__dirname, '../../../client/views/collect'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'
    @state = new PersonalizeState user: @user
    @view = new @CollectView(state: @state, user: @user)
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#setCollectorLevel', ->
    it 'saves the collector level when the button is clicked', ->
      @view.$('a').eq(0).click()
      @view.user.get('collector_level').should.equal 3
      Backbone.sync.args[0][0].should.equal 'update'
      Backbone.sync.args[0][1].attributes.collector_level.should.equal 3
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'

    it 'sets the level of PersonalizeState', ->
      @view.$('a').eq(1).click()
      @view.state.get('current_level').should.equal 2

  describe '#render', ->
    it 'renders the template', ->
      html = @view.$el.html()
      html.should.containEql '60-Second Sign Up'
      _.each @state.get('levels'), (level) ->
        html.should.containEql level

  describe 'reonboarding', ->
    beforeEach ->
      @state.set 'reonboarding', true
      @view.render()

    it 'renders the reonboarding copy', ->
      html = @view.$el.html()
      html.should.not.containEql '60-Second Sign Up'
      html.should.containEql 'Personalize your Artsy experience'
