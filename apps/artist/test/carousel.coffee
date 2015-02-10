_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Carousel = require '../carousel'

describe 'Carousel', ->
  beforeEach ->
    @artist = new Artist fabricate 'artist', id: 'foobar'
    @carousel = new Carousel artist: @artist
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#fetch', ->
    it 'fetches iconic artworks and recent shows', (done) ->
      @carousel.fetch().then (collection) ->
        collection.last().get('href').should.equal '/artwork/iconic-artwork'
        collection.last().get('title').should.equal 'Iconic Artwork'
        done()

      Backbone.sync.args[0][1].url.should.containEql '/api/v1/artist/foobar/artworks?published=true'
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/related/shows?artist[]=foobar&sort=-end_at'

      Backbone.sync.args[0][2].success [fabricate 'artwork', id: 'iconic-artwork', title: 'Iconic Artwork']
      Backbone.sync.args[1][2].success []

  describe '#fetchAllInstallShots', ->
    it 'fetches shows and then install shots if the show is valid', ->
      @carousel.fetchAllInstallShots()
      Backbone.sync.args[0][2].success [
        fabricate 'show', id: 'foo', images_count: 0
        fabricate 'show', id: 'bar', images_count: 0
        fabricate 'show', id: 'baz', images_count: 3
      ]
      Backbone.sync.callCount.should.equal 2
      _.last(Backbone.sync.args)[2].url.should.containEql 'api/v1/partner_show/baz/images'
