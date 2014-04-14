rewire                = require 'rewire'
benv                  = require 'benv'
Backbone              = require 'backbone'
sinon                 = require 'sinon'
AuctionLots           = require '../../../../collections/auction_lots'
Artist                = require '../../../../models/artist'
_                     = require 'underscore'
{ resolve }           = require 'path'
{ fabricate }         = require 'antigravity'
{ stubChildClasses }  = require '../../../../test/helpers/stubs'

setupView = (artistOptions = {}, done) ->
  @artist = new Artist fabricate 'artist', artistOptions
  benv.render resolve(__dirname, '../../templates/index.jade'), {
    sd: {}, artist: @artist, sortBy: '-published_at'
  }, =>
    { ArtistView, @init } = mod =
      benv.requireWithJadeify resolve(__dirname, '../../client/index'), ['artistSort']
    stubChildClasses mod, this,
      ['FillwidthView', 'BlurbView', 'RelatedPostsView', 'RelatedGenesView', 'ArtistFillwidthList']
      ['nextPage', 'render']
    @view = new ArtistView el: $('body'), model: @artist
    done()

describe 'ArtistView', ->
  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe 'Artist without works', ->
    beforeEach (done) ->
      setupView.call this, published_artworks_count: 0, done

    describe '#template', ->
      it 'should have a no works available notice', ->
        @view.$el.html().should.include "There are no #{@view.model.get('name')} works on Artsy yet"

    describe '#pendRemovalOfEmptyNotice', ->
      it 'should remove the empty notice if it conspires that there are, in fact, artworks on the page', ->
        collection = new Backbone.Collection
        @view.$('.artist-header-empty').length.should.be.ok
        @view.pendRemovalOfEmptyNotice collection
        collection.trigger 'sync', ['existy']
        @view.$('.artist-header-empty').length.should.not.be.ok

  describe 'Artist with works', ->
    beforeEach (done) ->
      setupView.call this, published_artworks_count: 1, done

    describe '#initialize', ->
      it 'sets up fillwidth views with collections pointing to for sale and not for sale works', ->
        view1Opts = @FillwidthView.args[0][0]
        view2Opts = @FillwidthView.args[1][0]
        view1Opts.fetchOptions['filter[]'].should.equal 'for_sale'
        view2Opts.fetchOptions['filter[]'].should.equal 'not_for_sale'
        view1Opts.collection.url.should.include '/artworks'
        view2Opts.collection.url.should.include '/artworks'

      it 'sets up the blurb view if there is one', ->
        fixture = """
          <div class='artist-info-section'>
            <div class='artist-blurb'>
              <div class='blurb'></div>
            </div>
          </div>
        """
        @view.$el.html fixture
        @view.setupBlurb()
        viewBlurbOpts = @BlurbView.args[0][0]
        viewBlurbOpts.updateOnResize.should.equal true
        viewBlurbOpts.lineCount.should.equal 5

      it 'sets up the related genes view properly', ->
        viewGeneOpts = @RelatedGenesView.args[0][0]
        viewGeneOpts.model.should.equal @view.model

      it 'sets up related artists', ->
        @view.relatedArtistsPage.should.equal 2
        @view.relatedContemporaryPage.should.equal 2

      it 'sets up related posts', ->
        viewRelatedPostOpts = @RelatedPostsView.args[0][0]
        viewRelatedPostOpts.numToShow.should.equal 5
        viewRelatedPostOpts.model.should.equal @view.model

    describe 'sorting', ->
      it 'passes the correct sort option into setupArtworks when sorting by Recently Added, and updates the picker', ->
        $fixture = $ """
          <div class="bordered-pulldown-options">
            <a data-sort="-published_at">Recently Added<a>
          </div>
        """
        @view.onSortChange({ currentTarget: $fixture.find('a')})
        @view.sortBy.should.equal '-published_at'
        @view.$el.find('.bordered-pulldown-toggle').html().should.include 'Recently Added'

      it 'passes the correct sort option into setupArtworks when sorting by Relevance', ->
        $fixture = $ """
          <div class="bordered-pulldown-options">
            <a data-sort>Relevance<a>
          </div>
        """
        @view.onSortChange({ currentTarget: $fixture.find('a')})
        @view.sortBy.should.equal ''

    describe '#setupRelatedArtists', ->
      it 'renders related artists on sync', ->
        @view.renderRelatedArtists = sinon.stub()
        @view.setupRelatedArtists()
        @view.model.relatedArtists.trigger 'sync'
        @view.renderRelatedArtists.args[0][0].should.equal 'Artists'
