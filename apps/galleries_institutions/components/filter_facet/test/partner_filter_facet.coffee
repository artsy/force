PartnerFilterFacet = require '../partner_filter_facet.coffee'
Backbone = require 'backbone'
_ = require 'underscore'

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
    }]

    @aggregations = new Backbone.Model
    @facet = new PartnerFilterFacet
      allItems: @defaultItems
      facetName: 'location'
      displayName: 'Locations'
      aggregations: @aggregations

  describe '#initialize', ->
    it 'creates the item for all suggestions', ->
      @facet.allItemsSuggestion.name.should.equal 'All Locations'
    it 'stores the defaultItems', ->
      @facet.allItems.should.deepEqual [
        { id: 'location-1', name: 'Location 1' }, { id: 'location-2', name: 'Location 2' },
        { id: 'location-3', name: 'Location 3' }, { id: 'location-4', name: 'Location 4' }]
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

      describe 'without empty state item ides supplied', ->
        it 'returns `allItemsSuggestion` and all countItems', (done) ->

          @facet.matcher '', (matches) =>
            matches.should.deepEqual [
              { name: 'All Locations', count: 10 }
              { id: 'location-1', name: 'Location 1', count: 5 }
              { id: 'location-2', name: 'Location 2', count: 3 }
              { id: 'location-3', name: 'Location 3', count: 0 }
              { id: 'location-4', name: 'Location 4', count: 0 }
            ]
            done()

    it 'matches name substrings', (done) ->
      @facet.matcher '2', (matches) =>
        matches.should.deepEqual [
          { name: 'All Locations', count: 10 }
          { id: 'location-2', name: 'Location 2', count: 3 }
        ]
        done()



