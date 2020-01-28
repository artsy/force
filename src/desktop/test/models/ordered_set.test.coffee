sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'

OrderedSet = rewire '../../models/ordered_set.coffee'

class Items extends Backbone.Model

OrderedSet.__set__ 'Items', Items

describe 'OrderedSet', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    fetch = -> { then: -> sinon.stub() }
    @spiedFetch = sinon.spy(fetch)
    Items.prototype.fetch = @spiedFetch
    @orderedSet = new OrderedSet

  afterEach ->
    Backbone.sync.restore()

  xdescribe '#fetchItems', ->
    # FIXME: Promises do not resolve
    it 'sets the items attribute', ->
      @orderedSet.fetchItems()
      @orderedSet.get('items').constructor.name.should.equal 'Items'

    it 'returns a promise', ->
      @orderedSet.fetchItems()

    it 'supports caching', ->
      @orderedSet.fetchItems(true, 60)
      @spiedFetch.calledOnce.should.be.ok()
      @spiedFetch.lastCall.args.should.eql [{cache: true, cacheTime: 60}]
