benv           = require 'benv'
Backbone       = require 'backbone'
sinon          = require 'sinon'
Partner        = require '../../../../models/partner.coffee'
Profile        = require '../../../../models/profile.coffee'
PartnerShows   = require '../../../../collections/partner_shows.coffee'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
_              = require 'underscore'
{ resolve }    = require 'path'
{ fabricate }  = require 'antigravity'

describe 'PartnerOverviewView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'when initializing artists', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
      }, =>
        PartnerOverviewView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/overview'), ['template', 'artistsGridTemplate']
        )

        @pas = [
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

        @partnerArtists = new PartnerArtists()
        @PartnerArtistsCollection = sinon.stub()
        @PartnerArtistsCollection.returns @partnerArtists
        mod.__set__ 'PartnerArtists', @PartnerArtistsCollection

        @profile = new Profile fabricate 'partner_profile'
        @partner = new Partner @profile.get 'owner'
        @template = sinon.stub()
        mod.__set__ 'template', @template
        @view = new PartnerOverviewView
          profile: @profile
          partner: @partner
          numberOfShows: 6
          el: $ 'body'
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#fetchAndOrganizeShows', ->

      it 'fetches all the partner artists and renders them', ->
        @partnerArtists.fetchUntilEnd = (options) =>
          @partnerArtists.add @pas
          options.success?()
        @view.renderArtists = sinon.stub()
        @view.initializeArtists()
        @view.renderArtists.calledOnce.should.be.ok
        @view.renderArtists.args[0][0].should.have.lengthOf 2
        @view.renderArtists.args[0][0][0].label.should.equal 'represented artists'
        @view.renderArtists.args[0][0][0].list.should.have.lengthOf 7
        @view.renderArtists.args[0][0][1].label.should.equal 'works available by'
        @view.renderArtists.args[0][0][1].list.should.have.lengthOf 4
