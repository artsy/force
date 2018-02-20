_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Counts = rewire '../../models/counts.coffee'
mappedAggregations = require '../fixtures/mapped_aggregations.coffee'
query = require '../../queries/counts.coffee'
response = require '../fixtures/metaphysics_counts_response.json'
mappedAggregations = require '../fixtures/mapped_aggregations.coffee'

describe 'FiltersView', ->

  beforeEach ->
    Counts.__set__ 'metaphysics', @metaphysics = sinon.stub()

    @metaphysics.returns Q.resolve response
    params = new Backbone.Model
    params.filterParamKeys = ['medium', 'period', 'gallery', 'institution']

    @counts = new Counts
      params: params

  describe 'fetch', ->
    beforeEach ->
      @counts.mapData = sinon.stub()
      @counts.setCurrentCounts = sinon.stub()
      @counts.fetch 'foo_bar'

    it 'fetches from metaphysics', ->
      @metaphysics.calledWith
        query: query
        variables:
          artist_id: 'foo_bar'
          aggregations: ['TOTAL', 'GALLERY', 'INSTITUTION', 'PERIOD', 'MEDIUM']
      .should.be.ok()

    it 'handles response',  ->
      @counts.mapData.calledWith(response).should.be.ok()
      @counts.setCurrentCounts.called.should.be.ok()

  it 'mapData', ->
    mapped = @counts.mapData response
    @counts.totals.for_sale.should.eql 6
    @counts.totals.all.should.eql 26

    @counts.aggregations.should.eql mappedAggregations
    mapped.should.eql @counts.aggregations

  it 'setCurrentCounts', ->
    @counts.mapData response
    @counts.setCurrentCounts()
    @counts.get('for_sale').should.eql @counts.totals.for_sale
    @counts.get('all').should.eql @counts.totals.all

    @counts.params.set 'medium', 'painting', silent: true
    @counts.setCurrentCounts()

    @counts.get('for_sale').should.eql 1
    @counts.get('all').should.eql 7

    @counts.get('for_sale').should.eql _.findWhere(@counts.aggregations.for_sale.medium, id: 'painting').count
    @counts.get('all').should.eql _.findWhere(@counts.aggregations.all.medium, id: 'painting').count
