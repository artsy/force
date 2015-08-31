Q = require 'bluebird-q'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Galleries / Institutions routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = {}
    @res = render: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#partners', ->
    beforeEach ->
      routes.partners @req, @res

    it 'fetches featured gallery profiles + featured institutional profiles', ->
      Backbone.sync.callCount.should.equal 2
      # Featured gallery profiles
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[0][2].data.should.eql key: 'partners:featured-galleries', public: true
      # Featured institutional profiles
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[1][2].data.should.eql key: 'partners:featured-institutions', public: true

  describe '#galleries', ->
    beforeEach ->
      routes.galleries @req, @res

    it 'fetches featured gallery profiles + all the galleries', ->
      Backbone.sync.callCount.should.equal 2
      # Featured gallery profiles
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[0][2].data.should.eql key: 'partners:featured-galleries', public: true
      # All galleries
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/partners'
      Backbone.sync.args[1][2].data.should.eql "size=20&active=true&type=PartnerGallery&sort=sortable_id&has_full_profile=true&total_count=1"

  describe '#institutions', ->
    beforeEach ->
      routes.institutions @req, @res

    it 'fetches featured institutional profiles + the set of all institutions', ->
      Backbone.sync.callCount.should.equal 2
      # Featured institutional profiles
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sets'
      Backbone.sync.args[0][2].data.should.eql key: 'partners:featured-institutions', public: true
      # Set of all institutions
      Backbone.sync.args[1][2].url.should.containEql '/api/v1/set/51fbd2f28b3b81c2de000444/items'
      Backbone.sync.args[1][2].data.should.eql "size=20&total_count=1"
