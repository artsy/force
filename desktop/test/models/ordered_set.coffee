sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'

OrderedSet = rewire '../../models/ordered_set.coffee'

class Items extends Backbone.Model
  fetch: -> { then: -> sinon.stub() }

OrderedSet.__set__ 'Items', Items

describe 'OrderedSet', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @orderedSet = new OrderedSet

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchItems', ->
    it 'sets the items attribute', ->
      @orderedSet.fetchItems()
      @orderedSet.get('items').constructor.name.should.equal 'Items'

    it 'returns a promise', ->
      @orderedSet.fetchItems()
