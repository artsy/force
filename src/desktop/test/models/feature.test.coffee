_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Feature = require '../../models/feature.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'Feature', ->

  beforeEach ->
    @feature = new Feature fabricate 'feature'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#hasImage', ->

    it 'returns false if version not there', ->
      @feature.set image_versions: []
      @feature.hasImage('wide').should.not.be.ok()

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
          successStub.called.should.be.ok()
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


  describe '#shareTitle', ->

    it 'returns the name, a link, and truncates to a tweet', ->
      shareThis = @feature.shareTitle()
      shareThis.should.containEql @feature.get 'name'
      shareThis.should.containEql 'on Artsy'
      shareThis.should.containEql @feature.href()

  describe '#metaDescription', ->

    it 'Strips markdown in the description', ->
      @feature.set description: "**Children’s Museum of the Arts’ Art Auction** All proceeds support CMA’s Community Programs. To purchase tickets, click [here](http://cmany.org/events/art-auction/)!]"
