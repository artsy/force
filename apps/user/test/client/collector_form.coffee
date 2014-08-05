_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Profile = require '../../../../models/profile.coffee'
UserEdit = require '../../models/user_edit.coffee'
CurrentUser = require '../../../../models/current_user'
CollectorForm = benv.requireWithJadeify((resolve __dirname, '../../client/collector_form.coffee'), ['template'])
CollectorForm.__set__ 'LocationSearchView', Backbone.View
BookmarksView = class BookmarksView extends Backbone.View
  initialize: -> @bookmarks = new Backbone.Collection
CollectorForm.__set__ 'BookmarksView', BookmarksView

describe 'CollectorForm', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @user = new CurrentUser fabricate 'user'
    @userEdit = new UserEdit fabricate 'user'
    @view = new CollectorForm userEdit: @userEdit, user: @user
    @view.render()

    sinon.stub Backbone, 'sync'

    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the view', ->
      @view.$el.html().should.containEql 'About You'

  describe 'introduction', ->
    beforeEach ->
      sinon.stub @view, 'syncIntroduction'

    afterEach ->
      @view.syncIntroduction.restore()

    it 'syncs when a bookmark is destroyed', ->
      bookmark = new Backbone.Model
      @view.bookmarksView.bookmarks.trigger 'remove', bookmark
      @view.syncIntroduction.callCount.should.equal 0
      bookmark.trigger 'sync'
      @view.syncIntroduction.callCount.should.equal 1
