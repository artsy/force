_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Statuses = require '../statuses'

describe 'Statuses', ->
  beforeEach ->
    @artist = new Artist fabricate 'artist', id: 'foobar'
    @statuses = new Statuses artist: @artist

    sinon.stub Backbone, 'sync'
      .yieldsTo 'success', [{}]
      # Artwork filter fetch
      .onCall 0
      .yieldsTo 'success', total: 1
      # Artist fetch
      .onCall 1
      .yieldsTo 'success', _id: 'foobar_mongo_id'
      # Articles fetch
      .onCall 2
      .yieldsTo 'success', count: 1

  afterEach ->
    Backbone.sync.restore()

  it 'fetches the status of everything', ->
    @statuses.fetch()
    _.map Backbone.sync.args, (args) -> _.result args[1], 'url'
      .should.eql [
        'undefined/api/v1/search/filtered/artist/foobar/suggest',
        'undefined/api/v1/artist/foobar',
        'undefined/api/articles?artist_id=foobar_mongo_id&published=true',
        'undefined/api/v1/related/shows?artist_id=foobar&sort=-end_at&displayable=true',
        'undefined/api/v1/related/layer/main/artists?artist[]=foobar&exclude_artists_without_artworks=true',
        'undefined/api/v1/related/layer/contemporary/artists?artist[]=foobar&exclude_artists_without_artworks=true'
      ]

  it 'resolves with the statuses',->
    @statuses.fetch()
      .then (statuses) ->
        statuses.should.eql
          articles: true
          artists: true
          artworks: true
          biography: false
          contemporary: true
          shows: true
