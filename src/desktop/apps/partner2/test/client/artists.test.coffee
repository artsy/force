Q = require 'bluebird-q'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
PartnerShows = require '../../../../collections/partner_shows.coffee'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
_ = require 'underscore'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

ArtistsListView = benv.requireWithJadeify(
  (resolve __dirname, '../../components/artists_list/view'), ['template']
)
PartnerArtistsView = benv.requireWithJadeify(
  (resolve __dirname, '../../client/artists'), ['template']
)

describe 'PartnerArtistsView', ->

  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'when displaying artists', ->
    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
        asset: (->)
        params: {}
      }, =>
        @profile = new Profile fabricate 'partner_profile'
        @partner = @profile.related().owner
        PartnerArtistsView.__set__ 'ArtistView', @ArtistView = sinon.stub()
        PartnerArtistsView.__set__ 'ArtistsListView', ArtistsListView
        @partnerArtists = new PartnerArtists [
          fabricate('partner_artist', represented_by: false),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist', represented_by: false),
          fabricate('partner_artist', represented_by: false),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist', represented_by: false, published_artworks_count: 0),
          fabricate('partner_artist', represented_by: false)
        ]
        @view = new PartnerArtistsView
          profile: @profile
          partner: @partner
          cache: { artists: @partnerArtists }
          artistsListColumnSize: 4
          pageSize: 5
          el: $ 'body'
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initializeArtistsList', ->
      it 'returns a thenable promise', ->
        @view.initializeArtistsList().then.should.be.a.Function()

      it 'initializes the ArtistsListView view with cached collection', ->
        @view.collection.models.should.eql @partnerArtists.models

    describe '#initializeArtistOrArtists', ->
      it 'renders the artist if @artistId', ->
        view = new PartnerArtistsView
          profile: @profile
          partner: @partner
          artistId: 'henry-moore'
          el: $ 'body'
        renderArtist = sinon.stub view, 'renderArtist'
        infiniteScrollingArtists = sinon.stub view, 'infiniteScrollingArtists'
        view.initializeArtistOrArtists()
        renderArtist.calledOnce.should.be.ok()
        infiniteScrollingArtists.called.should.not.be.ok()

      it 'initializes infinite scrolling artists if no @artistId', ->
        view = new PartnerArtistsView
          profile: @profile
          partner: @partner
          el: $ 'body'
        renderArtist = sinon.stub view, 'renderArtist'
        infiniteScrollingArtists = sinon.stub view, 'infiniteScrollingArtists'
        view.initializeArtistOrArtists()
        renderArtist.calledOnce.should.not.be.ok()
        infiniteScrollingArtists.called.should.be.ok()

    describe '#renderNextPageOfArtists', ->

      it 'displays the pages of artists who have published artworks until the end', ->
        @view.nextPage.should.equal 2
        @ArtistView.callCount.should.equal 5
        @view.renderNextPageOfArtists()
        @view.nextPage.should.equal 3
        @ArtistView.callCount.should.equal 10
        @view.renderNextPageOfArtists()
        @view.nextPage.should.equal 4
        @ArtistView.callCount.should.equal 11
