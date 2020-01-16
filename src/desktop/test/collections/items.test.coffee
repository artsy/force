sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Items = require '../../collections/items'

describe 'Items', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @items = new Items [fabricate('featured_link'), {}], { id: 'foobar' }

  afterEach ->
    Backbone.sync.restore()

  describe '#url', ->
    it 'should return the appropriate url', ->
      @items.id.should.equal 'foobar'
      @items.url().should.containEql '/api/v1/set/foobar/items'

  describe '#model', ->
    it 'news up the appropriate class', ->
      @items.at(0).constructor.name.should.equal 'FeaturedLink'
      @items.at(1).constructor.name.should.equal 'Item'
