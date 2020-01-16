_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Filter = require '../model'

describe 'Filter', ->
  beforeEach ->
    types = ['catalogue', 'catalogue', 'review', 'interview', 'review']
    @filter = new Filter
      collection: new Backbone.Collection _.times 5, (i) -> fabricate 'show', type: types[i]
      filter_by: 'type'
      filters:
        catalogue: 'Exhibition Catalogues'
        review: 'Exhibition Reviews'
        interview: 'Interviews'
        monograph: 'Monographs'
        biography: 'Biographies'

  describe 'defaults', ->
    it 'sets some sensible defaults', ->
      @filter.get('active').should.equal 'all'
      @filter.get('filter_by').should.equal 'type'

  describe '#relevant', ->
    it 'returns only the filters needed from the requested filters', ->
      @filter.relevant().should.eql
        catalogue: 'Exhibition Catalogues'
        review: 'Exhibition Reviews'
        interview: 'Interviews'
