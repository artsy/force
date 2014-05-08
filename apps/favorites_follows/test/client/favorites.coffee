benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
CurrentUser   = require '../../../../models/current_user.coffee'
Artworks      = require '../../../../collections/artworks.coffee'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'FavoritesView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.infiniteScroll = sinon.stub()
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
        stubChildClasses mod, @,
          ['SuggestedGenesView', 'ArtworkColumnsView']
          ['render', 'appendArtworks']
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

      beforeEach (done) ->
        Backbone.sync.args[0][2].success []
        done()

      it 'shows hint for adding favorite artworks', ->
        @view.$el.html().should.include 'Add works to your favorites'

      it 'shows suggested genes genes', ->
        @SuggestedGenesView::render.calledOnce.should.be.ok

  describe 'with favorites items', ->

    beforeEach (done) ->
      @sync = sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/favorites.jade'), {
        sd: {}
      }, =>
        { FavoritesView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/favorites'), ['hintTemplate','favoritesStatusTemplate']
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

        artworks = new Artworks()
        @fetchStub = sinon.stub artworks, "fetch", (options) =>
          start = (options.data.page - 1) * options.data.size
          end = start + options.data.size
          dest = new Artworks(@src[start...end])
          artworks.trigger('sync', dest)
        stubChildClasses mod, @,
          ['FavoritesStatusModal', 'ArtworkColumnsView']
          ['render', 'appendArtworks']
        mod.__set__ 'CurrentUser',
          orNull: -> _.extend fabricate 'user',
            initializeDefaultArtworkCollection: sinon.stub()
            defaultArtworkCollection: sinon.stub()
        @view = new FavoritesView
          el: $ 'body'
          collection: artworks
          pageSize: 2
        done()

    afterEach ->
      Backbone.sync.restore()

    it 'only shows the overlay saved state on hover', ->
      @view.$('.artwork-item:first-child .overlay-button-save').is(':visible').should.be.false
      # If we could trigger / force a hover state here...
      # @view.$('.artwork-item:first-child').hover()
      # @view.$('.artwork-item:first-child .overlay-button-save').is(':visible').should.be.true

    describe '#loadNextPage', ->

      it 'uses ArtworkColumns to render the next pages individually until the end', ->
        # page 1
        @ArtworkColumnsView.calledOnce.should.be.ok
        @view.params.get('page').should.equal 1
        artworks = _.last(@ArtworkColumnsView::appendArtworks.args)[0]
        artworks.should.have.lengthOf 2
        artworks[0].get('artwork').id.should.equal 'artwork1'
        artworks[1].get('artwork').id.should.equal 'artwork2'

        # page 2
        @view.loadNextPage()
        @view.params.get('page').should.equal 2
        artworks = _.last(@ArtworkColumnsView::appendArtworks.args)[0]
        artworks.should.have.lengthOf 2
        artworks[0].get('artwork').id.should.equal 'artwork3'
        artworks[1].get('artwork').id.should.equal 'artwork4'

        # page 3
        @view.loadNextPage()
        @view.params.get('page').should.equal 3
        artworks = _.last(@ArtworkColumnsView::appendArtworks.args)[0]
        artworks.should.have.lengthOf 2
        artworks[0].get('artwork').id.should.equal 'artwork5'
        artworks[1].get('artwork').id.should.equal 'artwork6'

        # page 4
        @view.loadNextPage()
        @view.params.get('page').should.equal 4
        artworks = _.last(@ArtworkColumnsView::appendArtworks.args)[0]
        artworks.should.have.lengthOf 1
        artworks[0].get('artwork').id.should.equal 'artwork7'

        @view.loadNextPage()
        @view.loadNextPage()
        @view.loadNextPage()
        @view.params.get('page').should.equal 5

        # 7 works, page size 2, 4 calls to get all
        @ArtworkColumnsView::appendArtworks.callCount.should.equal 4

      it 'passes sort=-position when fetching saved artworks', ->
        _.last(@fetchStub.args)[0].data.sort.should.equal '-position'
        @view.loadNextPage()
        _.last(@fetchStub.args)[0].data.sort.should.equal '-position'

    describe '#showStatusDialog', ->

      it 'shows the status dialog when trying to share if the favorites is private', ->
        @view.savedArtworkCollection.set private: true
        @view.$el.find('.share-to-facebook').trigger 'click'

      it 'does not show the status dialog when trying to share if the favorites is public', ->
        @view.savedArtworkCollection.set private: false
        @view.$el.find('.share-to-facebook').trigger 'click'
        @FavoritesStatusModal.called.should.not.be.ok

  describe 'with favorites items and variable responses', ->

    beforeEach (done) ->
      @sync = sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/favorites.jade'), {
        sd: {}
      }, =>
        { FavoritesView, @init } = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/favorites'), ['hintTemplate','favoritesStatusTemplate']
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

        artworks = new Artworks []
        @fetchStub = sinon.stub artworks, "fetch", (options) =>
          works = []
          n = if options.data.page is 2 then 2 else 3
          _(n).times =>
            work = @src.shift()
            works.push work unless _.isUndefined work
          dest = new Artworks works
          artworks.trigger('sync', dest)
        stubChildClasses mod, @,
          ['SaveControls', 'ArtworkColumnsView', 'FavoritesStatusModal']
          ['render', 'appendArtworks']
        mod.__set__ 'CurrentUser',
          orNull: -> _.extend fabricate 'user',
            initializeDefaultArtworkCollection: sinon.stub()
            defaultArtworkCollection: sinon.stub()
        @view = new FavoritesView
          el: $ 'body'
          collection: artworks
          pageSize: 3
        done()

    afterEach ->
      Backbone.sync.restore()

    describe "#loadNextPage", ->

      it 'keeps fetching even if the API does not respond with a full page', ->
        # fetches page 1 on init...
        @view.params.get('page').should.equal 1
        artworks = _.last(@ArtworkColumnsView::appendArtworks.args)[0]
        artworks.should.have.lengthOf 3
        artworks[0].get('artwork').id.should.equal 'artwork1'
        artworks[1].get('artwork').id.should.equal 'artwork2'
        artworks[2].get('artwork').id.should.equal 'artwork3'

        # on page 2, the response is not a full page
        @view.loadNextPage()
        artworks = _.last(@ArtworkColumnsView::appendArtworks.args)[0]
        artworks.should.have.lengthOf 2
        artworks[0].get('artwork').id.should.equal 'artwork4'
        artworks[1].get('artwork').id.should.equal 'artwork5'
        @view.params.get('page').should.equal 2

        # only two left in the whole set
        @view.loadNextPage()
        artworks = _.last(@ArtworkColumnsView::appendArtworks.args)[0]
        artworks.should.have.lengthOf 2
        artworks[0].get('artwork').id.should.equal 'artwork6'
        artworks[1].get('artwork').id.should.equal 'artwork7'
        @view.params.get('page').should.equal 3

        @view.loadNextPage()
        @view.params.get('page').should.equal 4
        @view.loadNextPage()
        @view.loadNextPage()
        @view.params.get('page').should.equal 4

        # 7 works, page size 3, then 2, then 3, 3 calls to get all
        @ArtworkColumnsView::appendArtworks.callCount.should.equal 3
