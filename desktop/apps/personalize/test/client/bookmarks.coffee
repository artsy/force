benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../models/current_user'
UserInterestsView = null

describe 'BookmarksView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      UserInterestsView = rewire '../../../../components/user_interests/view'
      UserInterestsView.__set__ 'TypeaheadView', Backbone.View
      UserInterestsView.__set__ 'ResultsListView', Backbone.View
      @BookmarksView = benv.requireWithJadeify require.resolve('../../client/views/bookmarks'), ['template']
      @BookmarksView.__set__ 'UserInterestsView', UserInterestsView
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub @BookmarksView::, 'advance'
    @user = new CurrentUser fabricate 'user'
    @state = new PersonalizeState user: @user
    @view = new @BookmarksView state: @state, user: @user
    @view.render()

  afterEach ->
    @view.advance.restore()

  describe '#render', ->
    it 'renders the template', ->
      html = @view.$el.html()
      html.should.containEql 'Which artists are in your collection?'
      html.should.containEql 'Skip'

  describe '#advance', ->
    it 'is able to advance to the next step', ->
      @view.$('.personalize-skip').click()
      @view.advance.called.should.be.true()

  describe '#setSkipLabel', ->
    it 'is triggered when a user expresses an artist interest', ->
      @view.userInterestsView.collection.addInterest fabricate 'artist'
      @view.$('.personalize-skip').text().should.equal 'Next'
