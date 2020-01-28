sinon = require 'sinon'
Backbone = require 'backbone'
FeaturedLinks = require '../../collections/featured_links'
{ fabricate } = require '@artsy/antigravity'

describe 'FeaturedLinks', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @links = new FeaturedLinks [
      fabricate 'featured_link'
      fabricate 'featured_link'
    ]

  afterEach ->
    Backbone.sync.restore()

  describe '@fetchHomepageSet', ->

    it 'fetches from the homepage:features key', ->
      FeaturedLinks.fetchHomepageSet()
      Backbone.sync.args[0][1].url.should.containEql 'homepage:features'

    it 'calls back with the featured links', (done) ->
      FeaturedLinks.fetchHomepageSet success: (links) ->
        links.first().get('title').should.equal 'Kittens are the new black!'
        done()
      Backbone.sync.args[0][2].success id: 'foobar'
      Backbone.sync.args[1][2].success [
        fabricate 'featured_link', title: 'Kittens are the new black!'
        fabricate 'featured_link'
      ]
