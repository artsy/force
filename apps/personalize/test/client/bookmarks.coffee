benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'BookmarksView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @BookmarksView = benv.requireWithJadeify resolve(__dirname, '../../client/views/bookmarks'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub @BookmarksView::, 'advance'
    @user = new CurrentUser fabricate 'user'
    @state = new PersonalizeState user: @user
    @view = new @BookmarksView(state: @state, user: @user)
    @view.render()

  afterEach ->
    @view.advance.restore()

  describe '#render', ->
    it 'renders the template', ->
      html = @view.$el.html()
      html.should.include 'What artists are in your collection?'
      html.should.include 'Skip'

  describe '#advance', ->
    it 'is able to advance to the next step', ->
      @view.$('.personalize-skip').click()
      @view.advance.called.should.be.true

  describe '#setSkipLabel', ->
    it 'is triggered when a collect or uncollect occurs', ->
      @view.bookmarksSearchView.trigger 'collect'
      @view.$('.personalize-skip').text().should.equal 'Next'
