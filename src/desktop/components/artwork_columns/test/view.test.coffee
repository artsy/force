_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'

ArtworkColumnsView = null

xdescribe 'ArtworkColumns', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      ArtworkColumnsView = benv.requireWithJadeify resolve(__dirname, '../view'), ['artworkColumns', 'artworkItem']
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
      el: $('body')
      collection: @artworks
      user: new CurrentUser

  describe '#initialize', ->

    it 'sets up internal state', ->
      sinon.stub(CurrentUser, 'orNull').returns new CurrentUser fabricate 'user'
      @view.seeMore.should.be.false()
      @view.columns[0].should.have.property 'height'
      @view.columns[0].should.have.property 'artworkCount'
      CurrentUser.orNull.restore()

  describe '#length', ->

    it 'reports the number of rendered elements', ->
      @view.length().should.equal 0
      @view.appendArtworks _.times 4, (-> new Artwork fabricate 'artwork')
      @view.length().should.equal 4
      @view.appendArtworks _.times 4, (-> new Artwork fabricate 'artwork')
      @view.length().should.equal 8

  describe '#_columnWidth',  ->

    beforeEach ->
      sinon.stub($.fn, 'width').returns 1280

    afterEach ->
      $.fn.width.restore()

    it 'total width of columns should be less than container width', ->
      totalWidth = (@view._columnWidth() * @view.numberOfColumns) + ((@view.numberOfColumns - 1) * @view.gutterWidth)
      totalWidth.should.be.below @view.$el.width()

  describe '#setUserSavedArtworks', ->

    describe 'with a current user', ->

      it 'inits the saved artworks collection', ->
        sinon.stub(CurrentUser, 'orNull').returns new CurrentUser fabricate 'user'
        @view = new ArtworkColumnsView
          el: $('body')
          collection: @artworks
        @view.currentUser.should.be.instanceOf CurrentUser
        @view.artworkCollection.should.be.ok()
        CurrentUser.orNull.restore()

    describe 'without a current user', ->

      it 'leaves the collection undefined', ->
        _.isNull(@view.currentUser).should.be.true()
        _.isUndefined(@view.artworkCollection).should.be.true()

  describe '#rebalance', ->

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
      @view = new ArtworkColumnsView
        el: $('body')
        collection: @artworks
        isOrdered: true
        allowDuplicates: true

      it 'removes artworks from the last column and redistributes to the shortest column', ->
        $('.artwork-column:eq(0) .artwork-item').should.have.lengthOf 3
        $('.artwork-column:eq(1) .artwork-item').should.have.lengthOf 3
        $('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 2
        @view.rebalance(800, 2)
        $('.artwork-column:eq(0) .artwork-item').should.have.lengthOf 4
        $('.artwork-column:eq(1) .artwork-item').should.have.lengthOf 3
        $('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 1

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
          el: $('body')
          collection: @artworks
          isOrdered: true
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
          el: $('body')
          collection: @artworks
          totalWidth: 1120
          allowDuplicates: true
        @view.$('.artwork-column:eq(0) .artwork-item').should.have.lengthOf 3
        @view.$('.artwork-column:eq(1) .artwork-item').should.have.lengthOf 3
        @view.$('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 2
        @view.shortestColumn.should.equal 2

        # Add a work to verify it goes to the shortest column
        artwork = new Artwork fabricate 'artwork'
        _.extend artwork.get('images')[0], { original_width: 700, original_height: 200, aspect_ratio: 3.5 }
        @view.appendArtworks [artwork]
        @view.$('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 3
        @view.shortestColumn.should.equal 2

        artwork = new Artwork fabricate 'artwork'
        _.extend artwork.get('images')[0], { original_width: 700, original_height: 200, aspect_ratio: 3.5 }
        @view.appendArtworks [artwork]
        @view.$('.artwork-column:eq(2) .artwork-item').should.have.lengthOf 4
        @view.shortestColumn.should.equal 0

      describe '#addToShortestColumn', ->
        beforeEach ->
          @view = new ArtworkColumnsView
            el: $('body')
            collection: @artworks
            totalWidth: 1120
            allowDuplicates: true

          sinon.stub($.fn, 'height').returns 160

        afterEach ->
          $.fn.height.restore()

        it 'can accept normal Artwork models', ->
          artwork = new Artwork fabricate 'artwork'
          _.extend artwork.get('images')[0], original_width: 700, original_height: 160, aspect_ratio: 3.5
          @view.shortestColumn.should.equal 2
          @view.addToShortestColumn artwork
          @view.shortestColumn.should.equal 2
          @view.addToShortestColumn artwork
          @view.shortestColumn.should.equal 0
          @view.addToShortestColumn artwork
          @view.shortestColumn.should.equal 1

        it 'can accept jQuery objects directly', ->
          $column = @view.$(".artwork-column:eq(#{@view.shortestColumn})")
          $artwork = $column.find('.artwork-item').last().clone()
          @view.shortestColumn.should.equal 2
          @view.addToShortestColumn $artwork
          @view.shortestColumn.should.equal 2
          @view.addToShortestColumn $artwork
          @view.shortestColumn.should.equal 0
          @view.addToShortestColumn $artwork
          @view.shortestColumn.should.equal 1

    it 'doesnt add duplicates', ->
      @view = new ArtworkColumnsView
        el: $('body')
        collection: @artworks
        isOrdered: true
      @view.collection.reset [fabricate('artwork', id: 'bar'), fabricate('artwork', id: 'foo')]
      @view.appendArtworks [new Artwork(fabricate('artwork', id: 'foo'))]
      @view.collection.length.should.equal 2
