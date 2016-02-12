benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
UserEdit = require '../../../models/user_edit'
SavedArtworksView = benv.requireWithJadeify require.resolve('../view'), ['template']
SavedArtworksView.__set__
  defer: (cb) -> cb()
  ArtworkColumnsView: Backbone.View

describe 'SavedArtworksView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub SavedArtworksView::, 'appendToColumns'

    @user = new UserEdit fabricate 'user'
    @view = new SavedArtworksView user: @user
    @view.render()

  afterEach ->
    Backbone.sync.restore()
    @view.appendToColumns.restore()

  describe '#render', ->
    describe 'not yet fetched', ->
      it 'renders the template', ->
        @view.render().$el.html()
          .should.containEql 'Nothing yet.'

    describe 'fetched', ->
      beforeEach ->
        SavedArtworksView.__set__ 'ArtworkColumnsView', @ArtworkColumnsView = sinon.stub()
        Backbone.sync
          .yieldsTo 'success', artworks = [fabricate 'artwork']
          .returns Promise.resolve artworks

      it 'renders the template, appends the works', ->
        @view.fetch()
        @ArtworkColumnsView.args[0][0].collection
          .should.eql @view.artworks
