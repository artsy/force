_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
Partner = require '../../../../../models/partner.coffee'
PartnerArtists = require '../../../../../collections/partner_artists.coffee'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

PartnerArtistsListView = benv.requireWithJadeify resolve(
  __dirname, '../view.coffee'
), ['template']


describe 'PartnerArtistsListView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @partner = new Partner fabricate 'partner'
      @view = new PartnerArtistsListView partner: @partner
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#fetch', ->
    beforeEach ->
      @partnerArtists = new PartnerArtists()
      _.each [1..10], => @partnerArtists.add fabricate 'partner_artist', partner: @partner
      @fetchUntilEndInParallel = sinon.spy PartnerArtists::, 'fetchUntilEndInParallel'

    afterEach ->
      @fetchUntilEndInParallel.restore()

    context 'with empty collection', ->
      it 'makes proper requests to fetch partner artists', ->
        @view.fetch()
        @fetchUntilEndInParallel.calledOnce.should.be.ok()

      it 'returns a thenable promise', ->
        @view.fetch().then.should.be.a.Function()

      it 'fetches and returns partner artists', ->
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', @partnerArtists.models

        @view.fetch().then (artists) =>
          artists.length.should.equal 10
          artists.should.eql @partnerArtists.models

    context 'with non-empty collection', ->
      beforeEach ->
        @view = new PartnerArtistsListView
          partner: @partner
          collection: new PartnerArtists [fabricate 'partner_artist']

      it 'does not make requests to fetch partner artists', ->
        @view.fetch()
        @fetchUntilEndInParallel.called.should.not.be.ok()

      it 'returns a thenable promise', ->
        @view.fetch().then.should.be.a.Function()

      it 'returns the collection', ->
        @view.fetch().then (artists) =>
          artists.length.should.equal 1
          artists.should.eql @view.collection.models

    context 'with non-empty collection and forced fetch', ->
      beforeEach ->
        @view = new PartnerArtistsListView
          partner: @partner
          collection: new PartnerArtists [fabricate 'partner_artist']

      it 'makes proper requests to fetch partner artists', ->
        @view.fetch(true)
        @fetchUntilEndInParallel.calledOnce.should.be.ok()

      it 'returns a thenable promise', ->
        @view.fetch(true).then.should.be.a.Function()

      it 'resets collection, fetches and returns partner artists', ->
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', @partnerArtists.models

        @view.fetch(true).then (artists) =>
          artists.length.should.equal 10
          artists.length.should.not.equal 11
          artists.should.eql @partnerArtists.models

  describe '#groupArtists', ->

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
      view = new PartnerArtistsListView
        partner: @partner
        numberOfColumns: 4

      groups = view.groupArtists pas.models
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
      view = new PartnerArtistsListView
        partner: @partner
        numberOfColumns: 4

      groups = view.groupArtists pas.models
      groups.should.have.lengthOf 1
      groups[0].label.should.equal ''
      groups[0].cols.should.have.lengthOf 4
      groups[0].cols[0].should.have.lengthOf 2
      groups[0].cols[1].should.have.lengthOf 2
      groups[0].cols[2].should.have.lengthOf 2
      groups[0].cols[3].should.have.lengthOf 1

    it 'groups partner artists into groups with correct number of items in each column', ->
      pas = new PartnerArtists [
        # 6 represented artists
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist')
      ]
      view = new PartnerArtistsListView
        partner: @partner
        numberOfColumns: 4

      groups = view.groupArtists pas.models
      groups.should.have.lengthOf 1
      groups[0].label.should.equal ''
      groups[0].cols.should.have.lengthOf 4
      groups[0].cols[0].should.have.lengthOf 2
      groups[0].cols[1].should.have.lengthOf 2
      groups[0].cols[2].should.have.lengthOf 1
      groups[0].cols[3].should.have.lengthOf 1

    it 'groups partner artists into groups with correct number of items in single column', ->
      pas = new PartnerArtists [
        # 6 represented artists
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist')
      ]
      view = new PartnerArtistsListView
        partner: @partner
        numberOfColumns: 1

      groups = view.groupArtists pas.models
      groups.should.have.lengthOf 1
      groups[0].label.should.equal ''
      groups[0].cols.should.have.lengthOf 1
      groups[0].cols[0].should.have.lengthOf 6

    it 'groups all artists together when partner has distinguish_represented_artists: false', ->
      pas = new PartnerArtists [
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist')
      ]
      @partner.set('distinguish_represented_artists', false)
      view = new PartnerArtistsListView
        partner: @partner
        numberOfColumns: 4

      groups = view.groupArtists pas.models
      groups.should.have.lengthOf 1
      groups[0].label.should.equal ""
      groups[0].cols.should.have.lengthOf 4
      groups[0].cols[0].should.have.lengthOf 1
      groups[0].cols[1].should.have.lengthOf 1
      groups[0].cols[2].should.have.lengthOf 0

  describe '#render', ->
    beforeEach ->
      @pas = new PartnerArtists [
        fabricate('partner_artist', partner: @partner),
        fabricate('partner_artist', partner: @partner, published_artworks_count: 0),
        fabricate('partner_artist', partner: @partner)
      ]

    describe 'for partner galleries', ->
      beforeEach ->
        @view = new PartnerArtistsListView partner: @partner
        @view.render @pas.models

      it 'links artists to partner artist page if they have published artworks with this partner', ->
        @view.$('.artists-column > li > a').length.should.equal 2
        _.each @view.$('.artists-column > li > a'), (a) =>
          $(a).attr('href').should.startWith "/#{@partner.default_profile_id}/artist/"

      it 'disables artists links if they do not have published artworks with this partner', ->
        @view.$('.artists-column > li > span').length.should.equal 1
        _.each @view.$('.artists-column > li > span'), (span) =>
          $(span).hasClass 'artist-name'

    describe 'for non-partner galleries', ->
      beforeEach ->
        @view = new PartnerArtistsListView partner: @partner, linkToPartnerArtist: false
        @view.render @pas.models

      it 'links artists to their artists pages', ->
        @view.$('.artists-column > li > a').length.should.equal 3
        _.each @view.$('.artists-column > li > a'), (a) =>
          $(a).attr('href').should.startWith "/artist/"

  describe '#render', ->
    beforeEach ->
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no artists', ->
      @view.render []
      @view.remove.calledOnce.should.be.ok()
