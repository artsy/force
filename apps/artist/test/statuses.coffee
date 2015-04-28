_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Statuses = require '../statuses'

describe 'Statuses', ->
  beforeEach ->
    @artist = new Artist fabricate 'artist', id: 'foobar', _id: 'bitty'
    @statuses = new Statuses artist: @artist
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'fetches the status of everything', ->
    @statuses.fetch()
    # Snag all but the last URL, as these are direct fetches
    urls = _.first(_.map(Backbone.sync.args, (args) -> args[1].url), (Backbone.sync.args.length - 1))
    urls.should.eql [
      'undefined/api/v1/search/filtered/artist/foobar/suggest'
      'undefined/api/v1/related/shows?artist_id=bitty&sort=-end_at&displayable=true'
      'undefined/api/v1/related/layer/main/artists?artist[]=foobar&exclude_artists_without_artworks=true'
      'undefined/api/v1/related/layer/contemporary/artists?artist[]=foobar&exclude_artists_without_artworks=true'
      'undefined/artist/data/foobar/publications?merchandisable[]=false'
      'undefined/artist/data/foobar/publications?merchandisable[]=true'
      'undefined/artist/data/foobar/publications'
      'undefined/artist/data/foobar/collections'
      'undefined/artist/data/foobar/exhibitions'
    ]

  describe '#fetchArticles', ->
    it 'fetches the articles status', ->
      @statuses.fetch()
      # Fetches the artist first
      (artistFetch = _.last(Backbone.sync.args))[1].url()
        .should.containEql '/api/v1/artist/foobar'
      # Then fetches the articles using the `_id`
      artistFetch[2].success _id: 'foobar_mongo_id'
      _.last(Backbone.sync.args)[1].url()
        .should.containEql '/api/articles?artist_id=foobar_mongo_id&published=true'

  it 'resolves with the statuses', (done) ->
    @statuses.fetch().then (statuses) ->
      statuses.should.eql {
        artworks: true
        shows: true
        artists: true
        contemporary: true
        webArticles: true
        merchandisable: true
        bibliography: true
        collections: true
        exhibitions: true
        articles: true
      }
      done()
    successes = _.map(Backbone.sync.args, (args) -> args[2].success)
    # Artworks
    successes[0] total: 1
    _.each(successes[1..(Backbone.sync.args.length - 1)], (success) -> success([{}]))
    # Articles
    _.last(successes)(_id: 'foobar_mongo_id')
    _.last(Backbone.sync.args)[2].success(count: 1)
