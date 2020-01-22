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
        PartnerArtistsView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/artists'), ['template']
        )
        @profile = new Profile fabricate 'partner_profile'
        @partner = @profile.related().owner
        @ArtistView = sinon.stub()
        @ArtistView.returns @ArtistView
        mod.__set__ 'ArtistView', @ArtistView
        @ArtistsListView = sinon.stub()
        @ArtistsListView.returns @ArtistsListView
        mod.__set__ 'ArtistsListView', @ArtistsListView
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
        @partnerArtists.fetchUntilEnd = sinon.stub()
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

    describe '#fetchAllArtists', ->

      it 'uses the cached partner artists instead of fetching again', ->
        @partnerArtists.fetchUntilEnd.called.should.not.be.ok()

      it 'passes a parameter to filter partner artists that should not be displayed', ->
        @view.initialize
          profile: @profile
          partner: @partner
          cache: {}
          artistsListColumnSize: 4
          pageSize: 5
          el: $ 'body'
        @view.collection.url.indexOf("display_on_partner_profile=1").should.be.greaterThan -1
