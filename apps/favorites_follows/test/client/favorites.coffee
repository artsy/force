benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
CurrentUser   = require '../../../../models/current_user.coffee'
Artworks      = require '../../../../collections/artworks.coffee'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'FavoritesView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'without favorites items', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/favorites.jade'), {
        sd: {}
      }, =>
        { FavoritesView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/favorites'), ['hintTemplate']
        )
        artworks = new Artworks()
        sinon.stub artworks, "fetch", (options) -> options.success?([], [])
        @SuggestedGenesView = sinon.stub()
        @SuggestedGenesView.render = sinon.stub()
        @SuggestedGenesView.returns @SuggestedGenesView
        mod.__set__ 'SuggestedGenesView', @SuggestedGenesView
        mod.__set__ 'CurrentUser',
          orNull: -> _.extend fabricate 'user',
            initializeDefaultArtworkCollection: -> return
            defaultArtworkCollection: -> return
        @view = new FavoritesView
          el: $ 'body'
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#showEmptyHint', ->

      it 'shows hint for adding favorite artworks', ->
        @view.$el.html().should.include 'Add works to your favorites'

      it 'shows suggested genes genes', ->
        @SuggestedGenesView.render.should.calledOnce

  describe 'with favorites items', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/favorites.jade'), {
        sd: {}
      }, =>
        { FavoritesView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/favorites'), ['hintTemplate']
        )
        @src = [
          { artwork: fabricate 'artwork', id: 'artwork1' },
          { artwork: fabricate 'artwork', id: 'artwork2' },
          { artwork: fabricate 'artwork', id: 'artwork3' },
          { artwork: fabricate 'artwork', id: 'artwork4' },
          { artwork: fabricate 'artwork', id: 'artwork5' },
          { artwork: fabricate 'artwork', id: 'artwork6' },
          { artwork: fabricate 'artwork', id: 'artwork7' }
        ]
        numberOfColumns = 2
        numberOfRowsPerPage = 1
        artworks = new Artworks()
        @fetchStub = sinon.stub artworks, "fetch", (options) =>
          dest = @src.splice(0, numberOfColumns*numberOfRowsPerPage)
          artworks.add dest unless dest.length is 0
          options.success?(artworks, dest)
        mod.__set__ 'CurrentUser',
          orNull: -> _.extend fabricate 'user',
            initializeDefaultArtworkCollection: sinon.stub()
            defaultArtworkCollection: sinon.stub()
        @ArtworkColumnsView = sinon.stub()
        @ArtworkColumnsView.render = sinon.stub()
        @ArtworkColumnsView.appendArtworks = sinon.stub()
        @ArtworkColumnsView.returns @ArtworkColumnsView
        mod.__set__ 'ArtworkColumnsView', @ArtworkColumnsView
        mod.__set__ 'SaveControls', sinon.stub()
        @view = new FavoritesView
          el: $ 'body'
          collection: artworks
          numOfCols: numberOfColumns
          numOfRowsPerPage: numberOfRowsPerPage
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->

      it 'sets up the first page items of the current user', ->
        @view.collection.length.should.equal 2

    describe '#loadNextPage', ->

      it 'calls ArtworkColumnsView to render the first page', ->
        @ArtworkColumnsView.render.should.calledOnce
        @view.nextPage.should.equal 2

      it 'uses ArtworkColumns to render the next pages individually until the end', ->
        @view.loadNextPage()
        @view.nextPage.should.equal 3
        artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
        artworks.length.should.equal 2
        artworks[0].get('artwork').id.should.equal 'artwork3'
        artworks[1].get('artwork').id.should.equal 'artwork4'
        @view.loadNextPage()
        @view.nextPage.should.equal 4
        artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
        artworks.length.should.equal 2
        artworks[0].get('artwork').id.should.equal 'artwork5'
        artworks[1].get('artwork').id.should.equal 'artwork6'
        @view.loadNextPage()
        @view.nextPage.should.equal 5
        artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
        artworks.length.should.equal 1
        artworks[0].get('artwork').id.should.equal 'artwork7'
        @view.loadNextPage()
        @view.loadNextPage()
        @view.loadNextPage()
        @view.nextPage.should.equal 5
        @view.nextPage.should.equal 5

      it 'passes sort=-position when fetching saved artworks', ->
        _.last(@fetchStub.args)[0].data.sort.should.equal '-position'
        @view.loadNextPage()
        _.last(@fetchStub.args)[0].data.sort.should.equal '-position'
