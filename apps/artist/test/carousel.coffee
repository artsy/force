_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Carousel = require '../carousel'

describe 'Carousel', ->
  beforeEach ->
    @artist = new Artist fabricate 'artist', id: 'foobar', _id: 'bitty'
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

      Backbone.sync.args[0][1].url.should.containEql '/api/v1/related/shows?artist_id=bitty&sort=-end_at'
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/artist/foobar/artworks?published=true'

      Backbone.sync.args[0][2].success []
      Backbone.sync.args[1][2].success [fabricate 'artwork', id: 'iconic-artwork', title: 'Iconic Artwork']

    it 'protects against missing states', ->
      @carousel.fetch().then (collection) ->
        collection.last().get('href').should.equal '/artwork/iconic-artwork'
        collection.last().get('title').should.equal 'Iconic Artwork'
        done()
      Backbone.sync.args[0][2].error()
      Backbone.sync.args[1][2].success [fabricate 'artwork', id: 'iconic-artwork', title: 'Iconic Artwork']

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

    it 'returns a max of two install shots', (done) ->
      @carousel.fetchAllInstallShots().then (shots) ->
        shots.should.have.lengthOf 2
        done()

      Backbone.sync.args[0][2].success [
        fabricate 'show', id: 'foo', images_count: 1
        fabricate 'show', id: 'bar', images_count: 1
        fabricate 'show', id: 'baz', images_count: 1
      ]

      _.map Backbone.sync.args[1..3], (args) ->
        args[2].success [fabricate 'show_install_shot']

  describe '#fetchInstallShotsForShow', ->
    it 'is defensive against bad data', (done) ->
      @carousel.fetchInstallShotsForShow(fabricate 'show').then (shot) ->
        _.isUndefined(shot).should.be.true
        done()
      Backbone.sync.args[0][2].success []

  describe '#fetchIconicWorks', ->
    it 'fetchs artworks and returns carousel figures', (done) ->
      @carousel.fetchIconicWorks().then (shots) ->
        shots.should.have.lengthOf 3
        shots[0].title.should.equal 'Skull'
        done()

      Backbone.sync.args[0][2].success [
        fabricate 'artwork'
        fabricate 'artwork'
        fabricate 'artwork'
      ]
