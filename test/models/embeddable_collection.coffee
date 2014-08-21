_ = require 'underscore'
sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
Artworks = require '../../collections/artworks'
ArtworkCollection = require '../../models/artwork_collection'
CurrentUser = require '../../models/current_user'
benv = require 'benv'
sd = require('sharify').data

{ fabricate } = require 'antigravity'

describe 'EmbeddableCollection', ->

  before (done) ->
    benv.setup =>
      done()

  after -> benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @currentUser = new CurrentUser(id: "user_id", email: "a@b.c")
    sd.API_URL = "http://localhost:5000/__api"
    sd.NODE_ENV = 'test'
    sd.CURRENT_USER = { lab_features: ['Embed'] }

    @artworkCollection = new ArtworkCollection(userId: @currentUser.get('id'))
    @embeddableCollection = @artworkCollection.embeddableCollection

  afterEach ->
    Backbone.sync.restore()
    sd.CURRENT_USER = undefined

  describe '#checkArtworksEmbeddable', ->

    it "triggers events for embeddable artworks", (done) ->
      @embeddableCollection.on 'embeddable:artwork1', ->  done()
      @embeddableCollection.checkArtworksEmbeddable 'params=params'

      Backbone.sync.args[0][1].url.should.containEql 'api/v1/artworks/embeddable?params=params'
      Backbone.sync.args[0][2].success [{id: 'artwork1'}]
