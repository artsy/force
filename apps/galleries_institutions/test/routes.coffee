Q = require 'q'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Partners = require '../../../collections/partners'
routes = require '../routes'

describe 'Galleries / Institutions routes', ->
  beforeEach ->
    sinon.stub(Backbone, 'sync').returns(Q.defer().promise).yieldsTo 'success', []
    @req = {}
    @res = render: sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    Q.allSettled.restore()

  describe '#partners', ->
    beforeEach ->
      returnGalleriesProfiles = value: new Backbone.Collection [fabricate 'profile', id: 'a-gallery']
      returnInstitutionalProfiles = value: new Backbone.Collection [fabricate 'profile', id: 'an-institution']
      sinon.stub(Q, 'allSettled').returns(then: (cb) -> cb([returnGalleriesProfiles, returnInstitutionalProfiles]))
      routes.partners @req, @res

    it 'fetches featured gallery profiles + featured institutional profiles', ->
      Backbone.sync.callCount.should.equal 2
      # Featured gallery profiles
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[0][2].data.should.eql key: 'partners:featured-galleries', public: true
      # Featured institutional profiles
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[1][2].data.should.eql key: 'partners:featured-institutions', public: true

    it 'calls render with the right data', ->
      @res.render.called.should.be.true
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].copy.header.should.equal 'Featured Partners'
      profiles = @res.render.args[0][1].featuredProfiles
      profiles.first().id.should.equal 'a-gallery'
      profiles.last().id.should.equal 'an-institution'

  describe '#galleries', ->
    beforeEach ->
      returnGalleriesProfiles = value: new Backbone.Collection [fabricate 'profile', id: 'a-gallery']
      returnGalleries = value: new Partners [fabricate 'partner']
      sinon.stub(Q, 'allSettled').returns(then: (cb) -> cb([returnGalleriesProfiles, returnGalleries]))
      routes.galleries @req, @res

    it 'fetches featured gallery profiles + all the galleries', ->
      Backbone.sync.callCount.should.equal 2
      # Featured gallery profiles
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[0][2].data.should.eql key: 'partners:featured-galleries', public: true
      # All galleries
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/partners'
      Backbone.sync.args[1][2].data.should.eql
        size: 20
        active: true
        type: 'PartnerGallery'
        sort: 'sortable_id'
        has_full_profile: true
        page: 1

    it 'calls render with the right data', ->
      @res.render.called.should.be.true
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].aToZGroup[0].columns.length.should.equal 3
      @res.render.args[0][1].featuredProfiles.first().id.should.equal 'a-gallery'
      @res.render.args[0][1].copy.header.should.equal 'Featured Galleries'

  describe '#institutions', ->
    beforeEach ->
      returnInstitutionalProfiles = value: new Backbone.Collection [fabricate 'profile', id: 'an-institution']
      returnInstitutions = value: new Partners [fabricate 'partner']
      sinon.stub(Q, 'allSettled').returns(then: (cb) -> cb([returnInstitutionalProfiles, returnInstitutions]))
      routes.institutions @req, @res

    it 'fetches featured institutional profiles + the set of all institutions', ->
      Backbone.sync.callCount.should.equal 2
      # Featured institutional profiles
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[0][2].data.should.eql key: 'partners:featured-institutions', public: true
      # Set of all institutions
      Backbone.sync.args[1][2].url.should.containEql '/api/v1/set/51fbd2f28b3b81c2de000444/items'
      Backbone.sync.args[1][2].data.should.eql size: 20, page: 1

    it 'calls render with the right data', ->
      @res.render.called.should.be.true
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].aToZGroup[0].columns.length.should.equal 3
      @res.render.args[0][1].featuredProfiles.first().id.should.equal 'an-institution'
      @res.render.args[0][1].copy.header.should.equal 'Institutions, Museums, and Nonprofits'
