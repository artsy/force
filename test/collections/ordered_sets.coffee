sinon           = require 'sinon'
rewire          = require 'rewire'
Backbone        = require 'backbone'
OrderedSets     = rewire '../../collections/ordered_sets.coffee'
{ fabricate }   = require 'antigravity'

fetchSpy = sinon.spy()

class FeaturedLink extends Backbone.Model
  fetchItems: fetchSpy

OrderedSets.__set__ 'FeaturedLink', FeaturedLink

describe 'OrderedSets', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @orderedSets = OrderedSets.new { key: 'browse:featured-genes' }

  afterEach ->
    Backbone.sync.restore()

  describe '#model', ->
    it 'handles OrderedSets and FeaturedLinks', ->
      @orderedSets.add {}
      @orderedSets.add [fabricate 'featured_link']
      @orderedSets.at(0).constructor.name.should.equal 'OrderedSet'
      @orderedSets.at(1).constructor.name.should.equal 'FeaturedLink'

  describe '#fetch', ->
    it 'sends the appropriate data as a query string', ->
      @orderedSets.fetch()
      Backbone.sync.args[0][2].data.should.include 'key=browse:featured-genes'

  describe '#fetchSets', ->
    it 'should fetch fetchItems for every model in the collection', ->
      @orderedSets.add [fabricate 'featured_link']
      @orderedSets.add [fabricate 'featured_link']
      @orderedSets.fetchSets()
      fetchSpy.calledTwice.should.be.ok
