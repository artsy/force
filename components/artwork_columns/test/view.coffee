_                  = require 'underscore'
benv               = require 'benv'
sinon              = require 'sinon'
Backbone           = require 'backbone'
CurrentUser        = require '../../../models/current_user.coffee'
Artwork            = require '../../../models/artwork.coffee'
Artworks           = require '../../../collections/artworks.coffee'
{ fabricate }      = require 'antigravity'
{ resolve }        = require 'path'

# This view has templates, need to require with Jadeify
ArtworkColumnsView = benv.requireWithJadeify resolve(__dirname, '../view'), ['artworkColumns', 'artworkItem']

describe 'ArtworkColumns', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @artworks = new Artworks([
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
    ])
    @view = new ArtworkColumnsView
      el:         $('body')
      collection: @artworks

  describe '#initialize', ->

    it 'sets up internal state', ->
      @view.seeMore.should.be.false
      @view.columns[0].should.have.property 'height'
      @view.columns[0].should.have.property 'artworkCount'

  describe '#setUserSavedArtworks', ->

    describe 'with a current user', ->

      it 'inits the saved artworks collection', ->
        sinon.stub(CurrentUser, 'orNull').returns new CurrentUser fabricate 'user'
        @view = new ArtworkColumnsView
          el:         $('body')
          collection: @artworks
        @view.currentUser.should.be.instanceOf CurrentUser
        @view.artworkCollection.should.be.ok
        CurrentUser.orNull.restore()

    describe 'without a current user', ->

      it 'leaves the collection undefined', ->
        _.isNull(@view.currentUser).should.be.true
        _.isUndefined(@view.artworkCollection).should.be.true

  describe '#appendArtworks', ->

    beforeEach ->
      # Create a short left column
      dims = [
        { original_width: 900, original_height: 200, aspect_ratio: 4.5 } # col 1, 200
        { original_width: 900, original_height: 900, aspect_ratio: 1 } # col 2, 900
        { original_width: 200, original_height: 900, aspect_ratio: 0.222 } # col 3, 900
        { original_width: 1000, original_height: 200, aspect_ratio: 5 } # col 1, 400
        { original_width: 1100, original_height: 900, aspect_ratio: 1.222 } # col 1, 1300
        { original_width: 600, original_height: 900, aspect_ratio: 0.667 } # col 2, 1800
        { original_width: 600, original_height: 900, aspect_ratio: 0.6667 } # col 3, 1800
        { original_width: 700, original_height: 200, aspect_ratio: 3.5 } # col 1, 1500
      ]
      @artworks.each (artwork, index) ->
        _.extend artwork.get('images')[0], dims[index]
      $('body').empty()

    describe 'when columns are ordered', ->

      it 'adds artworks to the next column from left to right', ->
        @view = new ArtworkColumnsView
          el:         $('body')
          collection: @artworks
          isOrdered:  true
          allowDuplicates: true
        $('.artwork-column:eq(0) .artwork-item').should.have.lengthOf 3
        $('.artwork-column:eq(1) .artwork-item').should.have.lengthOf 3
        $('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 2
        artwork = new Artwork fabricate 'artwork'
        @view.appendArtworks [artwork]
        $('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 3
        artwork = new Artwork fabricate 'artwork'
        @view.appendArtworks [artwork]
        $('.artwork-column:eq(0) .artwork-item').should.have.lengthOf 4
        artwork = new Artwork fabricate 'artwork'
        @view.appendArtworks [artwork]
        $('.artwork-column:eq(1) .artwork-item').should.have.lengthOf 4

    describe 'when columns are not ordered', ->

      it 'adds artworks to the shortest column', ->
        @view = new ArtworkColumnsView
          el:         $('body')
          collection: @artworks
          totalWidth: 1120
          allowDuplicates: true
        $('.artwork-column:eq(0) .artwork-item').should.have.lengthOf 4
        $('.artwork-column:eq(1) .artwork-item').should.have.lengthOf 2
        $('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 2
        @view.shortestColumn.should.equal 2

        # Add a work to verify it goes to the shortest column
        artwork = new Artwork fabricate 'artwork'
        _.extend artwork.get('images')[0], { original_width: 700, original_height: 200, aspect_ratio: 3.5 }
        @view.appendArtworks [artwork]
        $('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 3
        @view.shortestColumn.should.equal 2

        artwork = new Artwork fabricate 'artwork'
        _.extend artwork.get('images')[0], { original_width: 700, original_height: 200, aspect_ratio: 3.5 }
        @view.appendArtworks [artwork]
        $('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 4
        @view.shortestColumn.should.equal 2

    it 'doesnt add duplicates', ->
      @view = new ArtworkColumnsView
        el:         $('body')
        collection: @artworks
        isOrdered:  true
      @view.collection.reset [fabricate('artwork', id: 'bar'), fabricate('artwork', id: 'foo')]
      @view.appendArtworks [new Artwork(fabricate('artwork', id: 'foo'))]
      @view.collection.length.should.equal 2
