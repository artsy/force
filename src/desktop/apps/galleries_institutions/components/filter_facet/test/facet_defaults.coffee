Backbone = require 'backbone'
_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'

facetDefaults = rewire '../facet_defaults.coffee'

describe 'FacetDefaults', ->
  it 'sets display name to Galleries when given gallery for type', ->
    defaultFacets =  facetDefaults('gallery')
    _.find(defaultFacets, (f) -> f.facetName == 'term').displayName.should.equal 'Galleries'
  
  it 'sets display name to Institutions when given institution for type', ->
    defaultFacets = facetDefaults('institution')
    _.find(defaultFacets, (f) -> f.facetName == 'term').displayName.should.equal 'Institutions'

  it 'sets display name to empty string when no type was passed', ->
    defaultFacets = facetDefaults()
    _.find(defaultFacets, (f) -> f.facetName == 'term').displayName.should.equal ''
