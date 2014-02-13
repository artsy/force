benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
Partner       = require '../../../../models/partner.coffee'
Profile       = require '../../../../models/profile.coffee'
PartnerShows  = require '../../../../collections/partner_shows.coffee'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'PartnerShowsView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'when initializing shows', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
      }, =>
        PartnerArtistsView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/artists'), ['artistsListTemplate', 'template']
        )
        @profile = new Profile fabricate 'partner_profile'
        @partner = new Partner @profile.get 'owner'
        @partnerArtists = new PartnerArtists()
        @view = new PartnerArtistsView
          profile: @profile
          partner: @partner
          collection: @partnerArtists
          artistsListColumnSize: 4
          el: $ 'body'
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#groupPartnerArtists', ->

      it 'groups partner artists into represented and nonrepresented groups', ->
        pas = new PartnerArtists [
          # 7 represented artists
          # 4 non-represented artists with published_artworks_count > 0
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
          fabricate('partner_artist', represented_by: false)
        ]
        groups = @view.groupPartnerArtists pas.models
        groups.should.have.lengthOf 2
        groups[1].label.should.equal "works available by"
        groups[1].cols.should.have.lengthOf 2
        groups[1].cols[0].should.have.lengthOf 2
        groups[1].cols[1].should.have.lengthOf 2
        groups[0].label.should.equal "represented artists"
        groups[0].cols.should.have.lengthOf 2
        groups[0].cols[0].should.have.lengthOf 4
        groups[0].cols[1].should.have.lengthOf 3

      it 'groups partner artists into one single group if no valid non-represented artists', ->
        pas = new PartnerArtists [
          # 7 represented artists
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist'),
          fabricate('partner_artist')
        ]
        groups = @view.groupPartnerArtists pas.models
        groups.should.have.lengthOf 1
        groups[0].label.should.equal "artists"
        groups[0].cols.should.have.lengthOf 4
        groups[0].cols[0].should.have.lengthOf 2
        groups[0].cols[1].should.have.lengthOf 2
        groups[0].cols[2].should.have.lengthOf 2
        groups[0].cols[3].should.have.lengthOf 1

  describe 'when displaying artists', ->

    beforeEach (done) ->

      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
      }, =>
        PartnerArtistsView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/artists'), ['artistsListTemplate', 'template']
        )
        @profile = new Profile fabricate 'partner_profile'
        @partner = new Partner @profile.get 'owner'
        @ArtistView = sinon.stub()
        @ArtistView.returns @ArtistView
        mod.__set__ 'ArtistView', @ArtistView
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
          collection: @partnerArtists
          artistsListColumnSize: 4
          pageSize: 5
          el: $ 'body'
        @view.displayables = @partnerArtists.models
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#renderNextPageOfArtists', ->

      it 'displays the pages of artists who have published artworks until the end', ->
        @view.renderNextPageOfArtists()
        @view.nextPage.should.equal 2
        @ArtistView.callCount.should.equal 5
        @view.renderNextPageOfArtists()
        @view.nextPage.should.equal 3
        @ArtistView.callCount.should.equal 10
        @view.renderNextPageOfArtists()
        @view.nextPage.should.equal 4
        @ArtistView.callCount.should.equal 11
