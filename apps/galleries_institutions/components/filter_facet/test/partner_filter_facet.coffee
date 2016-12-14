Backbone = require 'backbone'
_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'

PartnerFilterFacet = rewire '../partner_filter_facet.coffee'

describe 'PartnerFilterFacet', ->
  aggreationsUpdate = location: { total: 10, countItems: [
    { id: 'location-1', name: 'Location 1', count: 5 }
    { id: 'location-2', name: 'Location 2', count: 3 }
    { id: 'location-5', name: 'Location 5', count: 2 }]}

  beforeEach ->
    @defaultItems = [{
      id: 'location-1'
      name: 'Location 1'
      extra_key: 'something'
    },{
      id: 'location-2'
      name: 'Location 2'
      extra_key: 'something'
    },{
      id: 'location-3'
      name: 'Location 3'
      extra_key: 'something'
    },{
      id: 'location-4'
      name: 'Location 4'
      extra_key: 'something'
    },{
      id: 'st-petersburg'
      name: 'St. Petersburg'
      extra_key: 'something'
    }]

    @aggregations = new Backbone.Model
    @facet = new PartnerFilterFacet
      allItems: @defaultItems
      facetName: 'location'
      displayName: 'Locations'
      aggregations: @aggregations
      synonyms: [ ['st', 'saint'] ]

  describe '#initialize', ->
    it 'creates the item for all suggestions', ->
      @facet.allItemsSuggestion.name.should.equal 'All Locations'
    it 'stores the defaultItems', ->
      @facet.allItems.should.deepEqual [
        { id: 'location-1', name: 'Location 1' }, { id: 'location-2', name: 'Location 2' },
        { id: 'location-3', name: 'Location 3' }, { id: 'location-4', name: 'Location 4' },
        { id: 'st-petersburg', name: 'St. Petersburg' }]
      @facet.countItems.should.equal @facet.allItems
      @aggregations.set 'location', 'some value'

  describe '#updateSuggestions', ->

    afterEach ->
      @aggregations.off 'change:location'

    it 'updates `allItemSuggestion` count', (done) ->
      @aggregations.on 'change:location', (aggregations, changed) =>
        @facet.allItemsSuggestion.should.deepEqual { name: 'All Locations', count: 10 }
        done()

      @aggregations.set aggreationsUpdate

    it 'updates countItems, excluding results not in `allItems`', (done) ->
      @aggregations.on 'change:location', (aggregations, changed) =>
        @facet.countItems.should.deepEqual [
          { id: 'location-1', name: 'Location 1', count: 5 }
          { id: 'location-2', name: 'Location 2', count: 3 }
          { id: 'location-3', name: 'Location 3', count: 0 }
          { id: 'location-4', name: 'Location 4', count: 0 }
          { id: 'st-petersburg', name: 'St. Petersburg', count: 0 }
        ]
        done()

      @aggregations.set aggreationsUpdate

  describe '#matcher', ->
    beforeEach ->
      @aggregations.set aggreationsUpdate
    describe 'empty query', ->
      describe 'with empty state item ids supplied', ->
        it 'returns `allItemsSuggestion` and limits results to those specified', (done) ->
          @facet.emptyStateItemIDs = ['location-2', 'location-3']
          @facet.matcher '', (matches) =>
            matches.should.deepEqual [
              { name: 'All Locations', count: 10 }
              { id: 'location-2', name: 'Location 2', count: 3 }
              { id: 'location-3', name: 'Location 3', count: 0 }
            ]
            done()

      describe 'without empty state item ids supplied', ->
        it 'returns `allItemsSuggestion` and all countItems', (done) ->

          @facet.matcher '', (matches) =>
            matches.should.deepEqual [
              { name: 'All Locations', count: 10 }
              { id: 'location-1', name: 'Location 1', count: 5 }
              { id: 'location-2', name: 'Location 2', count: 3 }
              { id: 'location-3', name: 'Location 3', count: 0 }
              { id: 'location-4', name: 'Location 4', count: 0 }
              { id: 'st-petersburg', name: 'St. Petersburg', count: 0 }
            ]
            done()

    describe 'with query', ->
      it 'matches name substrings', (done) ->
        @facet.matcher '2', (matches) =>
          matches.should.deepEqual [
            { name: 'All Locations', count: 10 }
            { id: 'location-2', name: 'Location 2', count: 3 }
          ]
          done()

      it 'matches strings with non-word characters around whitespaces', (done) ->
        @facet.matcher 'St P', (matches) =>
          matches.should.deepEqual [
            { name: 'All Locations', count: 10 }
            { id: 'st-petersburg', name: 'St. Petersburg', count: 0 }
          ]
          done()

  describe '#isMatched', ->
    it 'does not match random substrings', ->
      @facet.isMatched('ste', 'St. Petersburg').should.not.be.ok()

    it 'matches strings case insensitively', ->
      @facet.isMatched('st. petersburg', 'St. Petersburg').should.be.ok()

    it 'matches strings with hyphens', ->
      @facet.isMatched('Winchester-o', 'Winchester-on-the-Severn').should.be.ok()
      @facet.isMatched('Winchester-on-', 'Winchester-on-the-Severn').should.be.ok()

    it 'allows missing special characters around white spaces', ->
      @facet.isMatched('st petersburg', 'St. Petersburg').should.be.ok()
      @facet.isMatched('st petersburg', 'St -Petersburg').should.be.ok()
      @facet.isMatched('st petersburg', 'St- -Petersburg').should.be.ok()

    it 'allows additinal whitespaces', ->
      @facet.isMatched('  st   petersburg ', 'St. Petersburg').should.be.ok()

    it 'ignores diacritics', ->
      @facet.isMatched('zur', 'Zürich').should.be.ok()

    it 'replaces synonyms', ->
      @facet.isMatched('st ives', 'Saint Ives').should.be.ok()

  describe '#async_matcher', ->
    beforeEach ->
      # stub methods for FetchFilterPartner
      @fetch = sinon.stub()
      @fetch.returns then: sinon.stub()
      @fetchFilterPartnersStub = sinon.stub()
      @fetchFilterPartnersStub.returns { fetch: @fetch }
      PartnerFilterFacet.__set__ 'FetchFilterPartners', @fetchFilterPartnersStub
      
      @aggregations.set aggreationsUpdate
    
    describe 'empty query', ->
      it 'returns empty list', ->
        @facet.emptyStateItemIDs = ['location-2', 'location-3']
        @facet.async_matcher '', (matches) =>
          matches.should.eql []
        @fetch.called.should.not.be.ok()
    describe 'with query', ->
      it 'does not call fetch', ->
        @facet.async_matcher 'test', (matches) =>
        @fetch.calledOnce.should.be.ok()
