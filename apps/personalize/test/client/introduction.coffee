_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
Introduction = benv.requireWithJadeify resolve(__dirname, '../../client/views/introduction'), ['template']
Introduction.__set__ 'IntroductionEditView', Backbone.View

describe 'Introduction', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user', collector_level: 2
    @state = new PersonalizeState user: @user
    @view = new Introduction state: @state, user: @user
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.containEql 'Your gallery introduction'

  describe '#setProfession', ->
    it 'sets and saves the user profession', ->
      @view.$('input').val 'Human Being'
      @view.$('input').trigger 'blur'
      _.last(Backbone.sync.args)[1].attributes.profession.should.equal 'Human Being'

  describe '#complete', ->
    beforeEach ->
      @view.$('input').val 'Dog'
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success'

    it 'saves the user', ->
      @view.$('form').submit()
      _.last(Backbone.sync.args)[1].attributes.profession.should.equal 'Dog'

    it 'advances the state', (done) ->
      @state.on 'transition:next', -> done()
      @view.$('form').submit()
