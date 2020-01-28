_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
Partner = require '../../../../../models/partner.coffee'
PartnerArtists = require '../../../../../collections/partner_artists.coffee'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

PartnerArtistsGridView = benv.requireWithJadeify resolve(
  __dirname, '../view.coffee'
), ['template']


describe 'PartnerArtistsGridView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @partner = new Partner fabricate 'partner'
      @view = new PartnerArtistsGridView partner: @partner
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

    it 'makes proper requests to fetch partner artists', ->
      @view.fetch()
      @fetchUntilEndInParallel.calledOnce.should.be.ok()

    it 'returns a thenable promise', ->
      _.isFunction(@view.fetch().then).should.be.ok()

    it 'fetches and returns partner artists', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', @partnerArtists.models

      @view.fetch().then (artists) =>
        artists.length.should.equal 10
        artists.should.eql @partnerArtists.models

  describe '#group', ->
    it 'groups partner artists by represented_by', ->
      pas = new PartnerArtists [
        # 2 represented artists
        # 3 non-represented artists with published_artworks_count > 0
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist', represented_by: false),
      ]
      groups = @view.group pas.models
      groups.should.have.lengthOf 2
      groups[0].label.should.equal 'represented artists'
      groups[0].list.should.have.lengthOf 2
      groups[0].list.should.eql pas.slice(1, 3)
      groups[1].label.should.equal 'works available by'
      groups[1].list.should.have.lengthOf 3
      groups[1].list.should.eql [pas.at(0), pas.at(3), pas.at(4)]

    it 'returns 1 group with proper label if all represented artists', ->
      pas = new PartnerArtists [
        fabricate('partner_artist'),
        fabricate('partner_artist'),
      ]
      groups = @view.group pas.models
      groups.should.have.lengthOf 1
      groups[0].label.should.equal 'artists'
      groups[0].list.should.have.lengthOf 2
      groups[0].list.should.eql pas.models

    it 'returns 1 group with proper label if no represented artists', ->
      pas = new PartnerArtists [
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist', represented_by: false),
      ]
      groups = @view.group pas.models
      groups.should.have.lengthOf 1
      groups[0].label.should.equal 'artists'
      groups[0].list.should.have.lengthOf 3
      groups[0].list.should.eql pas.models

  describe '#render', ->
    beforeEach ->
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no artists', ->
      @view.render []
      @view.remove.calledOnce.should.be.ok()
