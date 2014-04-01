_               = require 'underscore'
rewire          = require 'rewire'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

Artist        = require '../../../../models/artist'
Artwork       = require '../../../../models/artwork'
Fair          = require '../../../../models/fair'
Sale          = require '../../../../models/sale'
CurrentUser   = require '../../../../models/current_user'

describe 'ArtworkView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.support.transition = { end: 'transitionend' }
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @artist = new Artist(fabricate 'artist')
    sinon.stub @artist.artworks, 'fetch'

    # Interestingly: jQuery "Every attempt is made to convert the string to a
    # JavaScript value (this includes booleans, numbers, objects, arrays, and null)"
    # and we're using numeric-looking strings for fabricated artwork image IDs.
    edition_sets = _.times(2, -> fabricate('edition_set', forsale: true, acquireable: true))
    artwork = fabricate('artwork', edition_sets: edition_sets, acquireable: true)
    _.each (artwork).images, (image) ->
      image.id = _.uniqueId('stringy')
    @artwork = new Artwork(artwork, parse: true)

    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd: {}
      artist: @artist
      artwork: @artwork
    }, =>
      @ArtworkView = benv.requireWithJadeify(
        (resolve __dirname, '../../client/view'),
        ['artistArtworksTemplate', 'detailTemplate']
      )
      @ArtworkView.__set__ 'ShareView', (@shareViewStub = sinon.stub())
      @ArtworkView.__set__ 'acquireArtwork', (@acquireArtworkStub = sinon.stub())
      @renderDetailSpy = sinon.spy @ArtworkView::, 'renderDetail'
      done()

  afterEach ->
    Backbone.sync.restore()
    @artist.artworks.fetch.restore()
    @renderDetailSpy.restore()

  describe 'user logged in', ->
    beforeEach ->
      @ArtworkView.__set__ 'CurrentUser', { orNull: -> new CurrentUser(fabricate 'user') }
      @view = new @ArtworkView el: $('#artwork-page'), artist: @artist, artwork: @artwork

    describe 'when an artwork changes', ->
      it 'only renders if the artwork changes', ->
        @renderDetailSpy.called.should.not.be.ok
        @view.artwork.set 'sale_message', 'SOLD'
        @renderDetailSpy.called.should.be.ok

    describe '#initialize', ->
      it 'has an artist and an artwork', ->
        @view.artwork.id.should.equal @artwork.id
        @view.artist.id.should.equal @artist.id

      it 'has a following collection if the user is logged in', ->
        _.isUndefined(@view.following).should.not.be.ok

    describe '#setupRelatedLayers', ->
      describe 'has no relations', ->
        beforeEach ->
          @artwork.fetchRelatedCollections            = sinon.stub()
          @view.belowTheFoldView.setupLayeredSearch   = sinon.stub()

        it 'sets up layered search by default', ->
          @view.setupRelatedLayers()
          @view.belowTheFoldView.setupLayeredSearch.called.should.be.ok

      describe 'has relations', ->
        beforeEach ->
          @view.belowTheFoldView.setupFair            = sinon.stub()
          @view.belowTheFoldView.setupSale            = sinon.stub()
          @view.belowTheFoldView.setupLayeredSearch   = sinon.stub()
          @view.setupFeatureNavigation                = sinon.stub()
          @artwork.fetchRelatedCollections            = sinon.stub()
          @view.deltaTrackPageView                    = sinon.stub()
          @artwork.relatedCollections = [
            { kind: 'fairs', length: 1, first: -> new Fair(id: 'i am a fair') }
            { kind: 'sales', length: 1, first: -> new Sale(id: 'i am a sale') }
          ]

        it 'sets up for the appropriate relations', ->
          @view.setupRelatedLayers()
          @view.belowTheFoldView.setupFair.called.should.be.ok
          @view.belowTheFoldView.setupFair.args[0][0].get('id').should.equal 'i am a fair'
          @view.setupFeatureNavigation.called.should.be.ok
          @view.setupFeatureNavigation.args[0][0].model.get('id').should.equal 'i am a fair'
          @view.setupFeatureNavigation.args[0][0].kind.should.equal 'fair'
          @view.belowTheFoldView.setupSale.called.should.be.ok
          @view.belowTheFoldView.setupSale.args[0][0].sale.get('id').should.equal 'i am a sale'
          @view.belowTheFoldView.setupSale.args[0][0].saved.constructor.name.should.equal 'ArtworkCollection'
          @view.deltaTrackPageView.called.should.be.ok
          @view.deltaTrackPageView.args[0][0].get('id').should.equal 'i am a fair'

    describe '#setupCurrentUser', ->
      it 'initializes the current user, saved artwork collection, and following collection', ->
        _.isUndefined(@view.currentUser).should.not.be.ok
        _.isUndefined(@view.saved).should.not.be.ok
        _.isUndefined(@view.following).should.not.be.ok

    describe '#setupArtistArtworks', ->
      it 'fetches a sample of the artwork artist\'s works', ->
        @artist.artworks.fetch.callCount.should.equal 1
        @artist.artworks.fetch.args[0][0].data.should.include size: 5, published: true

    describe '#renderArtistArtworks', ->
      it 'renders the artist\'s artworks', ->
        @artist.artworks.add([fabricate 'artwork'])
        @artist.artworks.trigger 'sync'

        @artist.artworks.pluck('id').should.not.include @artwork.id

        $el = @view.$('#artwork-artist-artworks-container')
        $el.hasClass('is-loaded')

        $el.html().should.include "data-id=\"#{@artist.artworks.first().id}\""

    describe '#openShare', ->
      it 'opens the share view when the share button is clicked', ->
        @view.$('.circle-icon-button-share').click()
        @shareViewStub.args[0][0].artwork.id.should.equal @artwork.id
        @shareViewStub.args[0][0].width.should.equal '350px'

    describe '#route', ->
      it 'transitions the state of the el with data attributes', ->
        @view.$el.attr('data-route').should.equal 'show'
        @view.route('more-info')
        @view.$el.attr('data-route-pending').should.equal 'more-info'
        @view.$el.attr('data-route').should.equal 'more-info'

    describe '#changeImage', ->
      beforeEach ->
        @$imageLink = @view.$('.artwork-additional-image.is-inactive').first()
        # The artwork images are fabricated with identical links
        # so lets change that
        @$imageLink.data('href', 'foobar')
        @$imageLink.click()

        @view.$('#the-artwork-image').attr('src').
          should.equal 'foobar'

        @view.artwork.activeImage().id.should.equal @$imageLink.data('id')

        @$imageLink.hasClass('is-active').should.be.ok

    describe '#setupFollowButton', ->
      it 'syncs the following collection with the artist id', ->
        syncFollowsSpy = sinon.spy @view.following, 'syncFollows'
        @view.setupFollowButton()
        syncFollowsSpy.args[0][0].should.include @artist.id

    describe '#selectEdition', ->
      it 'sets a private value on the view that is otherwise undefined', ->
        _.isUndefined(@view.__selectedEdition__).should.be.ok
        @view.$('.aes-radio-button').last().trigger('change')
        @view.__selectedEdition__.should.equal @artwork.editions.last().id

    describe '#selectedEdition', ->
      it 'should default to the first edition id', ->
        @view.selectedEdition().should.equal @artwork.editions.first().id
      it 'should favor the __selectedEdition__ if it has changed', ->
        @view.selectEdition(currentTarget: value: @artwork.editions.last().id)
        @view.selectedEdition().should.equal @artwork.editions.last().id

    describe '#buy', ->
      it 'should pass in the correct arguments when the buy button is clicked', ->
        ($target = @view.$('.artwork-buy-button')).click()
        @acquireArtworkStub.called.should.be.ok
        @acquireArtworkStub.args[0][0].should.equal @artwork
        @acquireArtworkStub.args[0][1].text().should.equal $target.text()
        @acquireArtworkStub.args[0][2].should.equal @view.selectedEdition()

  describe 'user logged out', ->
    beforeEach ->
      @ArtworkView.__set__ 'CurrentUser', { orNull: -> null }
      @view = new @ArtworkView el: $('#artwork-page'), artist: @artist, artwork: @artwork

    describe '#initialize', ->
      it 'does not have a following collection if the user is not logged in', ->
        _.isUndefined(@view.following).should.be.ok
