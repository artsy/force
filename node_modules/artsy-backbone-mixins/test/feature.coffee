_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
FeatureMixin = require '../lib/feature.coffee'
Fetch = require '../lib/fetch.coffee'

{ fabricate } = require 'antigravity'

class SaleArtwork extends Backbone.Model

class FeaturedSet extends Backbone.Model

class FeaturedLinks extends Backbone.Collection
  _.extend @prototype, Fetch('https://artsy.net')

class Artworks extends Backbone.Collection

  _.extend @prototype, Fetch('https://artsy.net')

  @fromSale: (saleArtworks) ->
    artworks = new Artworks saleArtworks.map (saleArtwork) ->
      _.extend saleArtwork.get('artwork'),
        saleArtwork: new SaleArtwork saleArtwork.omit('artwork')

class SaleArtworks extends Backbone.Collection
  _.extend @prototype, Fetch('https://artsy.net')

class Sale extends Backbone.Model
  fetchArtworks: (options = {}) ->
    @artworks = new SaleArtworks [], id: @id
    @artworks.fetchUntilEnd options

class Feature extends Backbone.Model
  _.extend @prototype, FeatureMixin('https://artsy.net', Sale, Artworks, FeaturedSet, FeaturedLinks)

describe 'Feature', ->

  beforeEach ->

    @feature = new Feature fabricate 'feature'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchSets', ->

    it 'collects the sets and items', (done) ->
      @feature.fetchSets success: (sets) ->
        sets[0].get('type').should.equal 'featured links'
        sets[0].get('name').should.equal 'Explore this bidness'
        sets[0].get('data').first().get('title').should.equal 'Featured link for this awesome page'
        done()

      _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc'])
      _.last(Backbone.sync.args)[2].success([fabricate 'featured_link', title: 'Featured link for this awesome page'])
      _.last(Backbone.sync.args)[2].success([])

    it 'callsback when the sets are fetched', (done) ->
      @feature.fetchSets setsSuccess: (sets) ->
        sets[0].get('type').should.equal 'featured links'
        sets[0].get('name').should.equal 'Explore this bidness'
        sets[0].get('data').first().get('title').should.equal 'Featured link for this awesome page'
        done()

      _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc'])
      _.last(Backbone.sync.args)[2].success([fabricate 'featured_link', title: 'Featured link for this awesome page'])
      _.last(Backbone.sync.args)[2].success([])

    it 'callsback when the artworks are fetched page and success', (done) ->
      successStub = sinon.stub()
      sale = fabricate 'sale'

      @feature.fetchSets
        artworkPageSuccess: successStub
        artworksSuccess: (saleFeaturedSet) =>
          successStub.called.should.be.ok
          saleFeaturedSet.get('type').should.equal 'artworks'
          @feature.get('sale').id.should.equal sale.id
          done()

      _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])
      _.last(Backbone.sync.args)[2].success([sale])
      _.last(Backbone.sync.args)[2].success([])

    it 'fetches until end for sets whose items are featured links', (done) ->
      @feature.fetchSets success: (sets) ->
          sets[0].get('type').should.equal 'featured links'
          sets[0].get('name').should.equal 'Explore this bidness top'
          sets[0].get('data').first().get('title').should.equal 'Featured link for this awesome page'
          sets[0].get('data').should.have.lengthOf 12
          done()

      _.last(Backbone.sync.args)[2].success([fabricate('set', name: 'Explore this bidness top', key: '0hello', id: 'def') ])

      _.last(Backbone.sync.args)[2].success([
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
      ])
      _.last(Backbone.sync.args)[2].success([
        fabricate 'featured_link', title: 'Featured link for this awesome page'
        fabricate 'featured_link', title: 'Featured link for this awesome page'
      ])
      _.last(Backbone.sync.args)[2].success([])

    xit 'sorts sets by key', ->

    xdescribe 'fetching a sale', ->

      it 'proxies the display_artist_list attribute', ->
