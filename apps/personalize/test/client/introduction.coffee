_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
IntroductionView = benv.requireWithJadeify resolve(__dirname, '../../client/views/introduction'), ['template']
IntroductionView.__set__ 'IntroductionEditView', Backbone.View

describe 'IntroductionView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.spy IntroductionView::, 'edit'

    @user = new CurrentUser fabricate 'user', collector_level: 2
    @state = new PersonalizeState user: @user
    @view = new IntroductionView state: @state, user: @user
    @view.render()

  afterEach ->
    Backbone.sync.restore()
    @view.edit.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.containEql 'Your gallery introduction'

  describe 'edit', ->
    it 'throws up an edit modal when the edit button is clicked', ->
      @view.$('.personalize-introduction-edit').click()
      @view.edit.called.should.be.true
