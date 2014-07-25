_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Profile = require '../../../../models/profile.coffee'
UserEdit = require '../../models/user_edit.coffee'
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
    @userEdit = new UserEdit fabricate 'user'
    @view = new CollectorForm userEdit: @userEdit
    @view.render()

    sinon.stub Backbone, 'sync'

    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the view', ->
      @view.$el.html().should.containEql 'About You'

  describe 'introduction', ->
    it 'renders an up-to-date introduction', ->
      @view.$el.html().should.containEql 'Craig is a collector and has been an Artsy member since'
      @view.bookmarksView.bookmarks.add fabricate 'artwork'
      @view.$el.html().should.containEql 'Craig’s collection includes Andy Warhol'
