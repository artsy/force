sinon = require 'sinon'
_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate2 } = require '@artsy/antigravity'
FilterArtworks = require '../../collections/filter_artworks'

describe 'Filter Artworks', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artworks = new FilterArtworks fabricate2('filter_artworks'), { parse: true }

  afterEach ->
    Backbone.sync.restore()

  describe '#prepareCounts', ->
    it 'should sort the mediums alphabetically', ->
      _.keys(@artworks.counts.medium)[0].should.equal "design"
      _.keys(@artworks.counts.medium)[1].should.equal "drawing"
      _.keys(@artworks.counts.medium)[2].should.equal "film-slash-video"
      _.keys(@artworks.counts.medium)[3].should.equal "installation"

    it 'should sort the price ranges by value', ->
      _.keys(@artworks.counts.price_range)[0].should.equal "*-1000"
      _.keys(@artworks.counts.price_range)[1].should.equal "1000-5000"
      _.keys(@artworks.counts.price_range)[2].should.equal "5000-10000"

  describe '#sync', ->
    it 'should map related_gene to gene_id', ->
      @artworks.fetch data: related_gene: 'cabbie'
      Backbone.sync.args[0][2].data.should.equal 'gene_id=cabbie'
