_             = require 'underscore'
sinon         = require 'sinon'
Backbone      = require 'backbone'
Feature       = require '../../models/feature'
{ fabricate } = require 'antigravity'

describe 'Feature', ->

  beforeEach ->
    @feature = new Feature fabricate 'feature'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#hasImage', ->

    it 'returns false if version not there', ->
      @feature.set image_versions: []
      @feature.hasImage('wide').should.not.be.ok

  xdescribe '#fetchItems', ->

    it 'collects the items into an array of helpful hashes', (done) ->
      @feature.fetchItems success: (items) ->
        items[0].type.should.equal 'featured links'
        items[0].title.should.equal 'Explore this bidness'
        items[0].data.first().get('title').should.equal 'Featured link for this awesome page'
        done()
      _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness'])
      _.last(Backbone.sync.args)[2].success([
        fabricate 'featured_link', title: 'Featured link for this awesome page'
      ])

    it 'orders the items properly', (done) ->
      @feature.fetchItems success: (items) ->
        items[0].type.should.equal 'featured links'
        items[1].type.should.equal 'sale artworks'
        done()
      Backbone.sync.args[0][2].success([
          fabricate 'set', item_type: 'FeaturedLink'
          fabricate 'set', item_type: 'Sale'
        ])
      Backbone.sync.args[1][2].success([fabricate 'sale'])
      Backbone.sync.args[2][2].success([fabricate 'featured_link'])
      Backbone.sync.args[3][2].success([fabricate 'sale_artwork'])

    it 'doesnt try to map empty sets', ->
      @feature.fetchItems success: (items) ->
        items[0].type.should.equal 'featured links'
        items.length.should.equal 1
        done()
      Backbone.sync.args[0][2].success([
          fabricate 'set', item_type: 'FeaturedLink'
          fabricate 'set', item_type: 'Sale'
        ])
      Backbone.sync.args[1][2].success([])
      Backbone.sync.args[2][2].success([fabricate 'featured_link'])

  xit 'gives back sale artworks', (done) ->
    @feature.fetchItems success: (items) ->
      items[0].data.first().get('title').should.equal 'Portrait of a Mouse'
      done()
    Backbone.sync.args[0][2].success([
        fabricate 'set', item_type: 'Sale'
      ])
    Backbone.sync.args[1][2].success([fabricate 'sale'])
    Backbone.sync.args[2][2].success([
      fabricate('sale_artwork', artwork: fabricate('artwork', title: 'Portrait of a Mouse'))
    ])

  xit 'sets auction artworks seperately', (done) ->
    @feature.fetchItems success: (items) ->
      items[0].type.should.equal 'auction artworks'
      items[0].data.first().get('title').should.equal 'Portrait of a Mouse'
      done()
    Backbone.sync.args[0][2].success([
        fabricate 'set', item_type: 'Sale'
      ])
    Backbone.sync.args[1][2].success([fabricate 'sale', is_auction: true])
    Backbone.sync.args[2][2].success([
      fabricate('sale_artwork', artwork: fabricate('artwork', title: 'Portrait of a Mouse'))
    ])

  xit 'sets the sale on the feature for short access if there is one', (done) ->
    @feature.fetchItems success: (items) =>
      @feature.get('sale').get('is_auction').should.be.ok
      done()
    Backbone.sync.args[0][2].success([
        fabricate 'set', item_type: 'Sale'
      ])
    Backbone.sync.args[1][2].success([fabricate 'sale', is_auction: true])
    Backbone.sync.args[2][2].success([
      fabricate('sale_artwork', artwork: fabricate('artwork', title: 'Portrait of a Mouse'))
    ])

  xit 'sets videos as the item.data', (done) ->
    @feature.fetchItems success: (items) =>
      items[0].type.should.equal 'video'
      items[0].data.first().get('title').should.equal 'A day in the life of a cat'
      done()
    _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Set of some videos, yo', item_type: 'Video'])
    _.last(Backbone.sync.args)[2].success([
      fabricate 'video', title: 'A day in the life of a cat'
    ])

  xit 'will always callback even if the item type is unkown'
  xit 'respects "display_on_mobile"'
