sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
OrderedSets = rewire '../../collections/ordered_sets.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'OrderedSets', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @orderedSets = new OrderedSets key: 'browse:featured-genes'

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchSets', ->
    beforeEach ->
      @fetchSpy = sinon.stub()
      @orderedSets.model::fetchItems = @fetchSpy
      @orderedSets.add [fabricate 'ordered_set']
      @orderedSets.add [fabricate 'ordered_set']
    it 'should call #fetchItems for set in the collection', ->
      @orderedSets.fetchSets()
      @fetchSpy.calledTwice.should.be.ok()
    it 'should return a promise', ->
      @orderedSets.fetchSets().constructor.name.should.equal 'Promise'
    it 'should be thennable', ->
      @orderedSets.fetchSets()

  describe '#fetchAll', ->
    beforeEach ->
      @orderedSets.fetch = sinon.stub().returns then: (cb) -> cb()
      @orderedSets.model::fetchItems = sinon.stub()
    it 'triggers sync:complete when it is done', (done) ->
      @orderedSets.on 'sync:complete', done
      @orderedSets.fetchAll()
      return
    it 'should be thennable', (done) ->
      @orderedSets.fetchAll().then -> done()
      return
