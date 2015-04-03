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

  afterEach ->
    Backbone.sync.restore()

  it 'fetches the status of everything', ->
    @statuses.fetch()
    _.map(Backbone.sync.args, (args) -> args[1].url).should.eql [
      'undefined/api/v1/search/filtered/artist/foobar/suggest'
      'undefined/api/v1/related/shows?artist[]=foobar&sort=-end_at&displayable=true'
      'undefined/api/v1/related/layer/main/artists?artist[]=foobar&exclude_artists_without_artworks=true'
      'undefined/api/v1/related/layer/contemporary/artists?artist[]=foobar&exclude_artists_without_artworks=true'
      'undefined/artist/data/foobar/publications?merchandisable[]=false'
      'undefined/artist/data/foobar/publications?merchandisable[]=true'
      'undefined/artist/data/foobar/publications'
      'undefined/artist/data/foobar/collections'
      'undefined/artist/data/foobar/exhibitions'
    ]


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
      }
      done()
    successes = _.map(Backbone.sync.args, (args) -> args[2].success)
    successes[0] total: 1
    _.each(successes[1..-1], (success) -> success([{}]))
