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

describe 'PartnerOverviewView', ->

  before (done) ->
    benv.setup ->
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
        asset: (->)
        params: {}
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
        @partner = @profile.related().owner
        @template = sinon.stub()
        @artistsGridTemplate = sinon.stub()
        mod.__set__ 'template', @template
        mod.__set__ 'artistsGridTemplate', @artistsGridTemplate
        @view = new PartnerOverviewView
          profile: @profile
          partner: @partner
          numberOfShows: 6
          el: $ 'body'
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#renderArtistsGrid', ->

      it 'fetches all the partner artists and renders them in grid', ->
        @partnerArtists.fetchUntilEndInParallel = (options) =>
          @partnerArtists.add @pas
          options.success?()
        @view.initializeArtists()
        @artistsGridTemplate.calledOnce.should.be.ok()
        @artistsGridTemplate.args[0][0].partner.get('name').should.equal @partner.get('name')
        @artistsGridTemplate.args[0][0].groups.should.have.lengthOf 2
        @artistsGridTemplate.args[0][0].groups[0].label.should.equal 'represented artists'
        @artistsGridTemplate.args[0][0].groups[0].list.should.have.lengthOf 7
        @artistsGridTemplate.args[0][0].groups[1].label.should.equal 'works available by'
        @artistsGridTemplate.args[0][0].groups[1].list.should.have.lengthOf 4

  describe 'when initializing partner or nonpartner overview', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
        asset: (->)
        params: {}
      }, =>
        @PartnerOverviewView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/overview'), ['template', 'artistsGridTemplate']
        )

        @partnerArtists = new PartnerArtists()
        @partnerArtists.fetchUntilEndInParallel = (options) => options?.success?()
        @PartnerArtistsCollection = sinon.stub()
        @PartnerArtistsCollection.returns @partnerArtists
        mod.__set__ 'PartnerArtists', @PartnerArtistsCollection

        @profile = new Profile fabricate 'partner_profile'
        @partner = @profile.related().owner
        @template = sinon.stub()
        @artistsGridTemplate = sinon.stub()
        @partnerShowsGrid = sinon.stub()
        @artistsListView = sinon.stub()
        mod.__set__ 'template', @template
        mod.__set__ 'artistsGridTemplate', @artistsGridTemplate
        mod.__set__ 'PartnerShowsGrid', @partnerShowsGrid
        mod.__set__ 'ArtistsListView', @artistsListView
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->

      it 'renders correct sections for partner galleries', ->
        @view = new @PartnerOverviewView
          profile: @profile
          partner: @partner
          numberOfShows: 6
          el: $ 'body'

        _.last(@template.args)[0].isPartner.should.be.ok()
        @artistsGridTemplate.calledOnce.should.be.ok()
        @partnerShowsGrid.calledOnce.should.be.ok()
        @artistsListView.called.should.not.be.ok()

      it 'renders correct sections for nonpartner galleries (top tier)', ->
        @partner.set('claimed', false)
        @partner.set('show_promoted',true)
        @view = new @PartnerOverviewView
          profile: @profile
          partner: @partner
          numberOfShows: 6
          el: $ 'body'

        _.last(@template.args)[0].isPartner.should.not.be.ok()
        _.last(@template.args)[0].showBanner.should.not.be.ok()
        @artistsGridTemplate.calledOnce.should.not.be.ok()
        @partnerShowsGrid.calledOnce.should.be.ok()
        @artistsListView.called.should.be.ok()

      it 'renders correct sections for nonpartner galleries (lower tier)', ->
        @partner.set('claimed', false)
        @partner.set('show_promoted',false)
        @view = new @PartnerOverviewView
          profile: @profile
          partner: @partner
          numberOfShows: 6
          el: $ 'body'

        _.last(@template.args)[0].isPartner.should.not.be.ok()
        _.last(@template.args)[0].showBanner.should.be.ok()
        @artistsGridTemplate.calledOnce.should.not.be.ok()
        @partnerShowsGrid.calledOnce.should.be.ok()
        @artistsListView.called.should.be.ok()
