_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Artist = require '../../../../models/artist'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
{ ArtistData } = require '../../client/data'

describe 'ArtistData', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @artist = new Artist fabricate 'artist', id: 'foobar'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @data = new ArtistData model: @artist

  afterEach ->
    Backbone.sync.restore()

  describe '#sync', ->
    # The purpose of this test is to fail when the sections
    # data object is changed so that assumptions in the rest of the spec
    # are clearly apparent
    it 'has the appropriate sections + calls', ->
      @data.sections.length.should.equal 7
      lengths = _.pluck(_.pluck(@data.sections, 'calls'), 'length')
      lengths.should.eql [0, 1, 1, 1, 1, 1, 2] # Per section sync calls
      _.reduce(lengths, ((memo, i) -> memo + i), 0).should.equal 7 # Total # of calls to Backbone.sync

    it 'runs over the sections data running all the fetches to the various related collections', ->
      @data.sync()
      Backbone.sync.callCount.should.equal 7
      urls = _.pluck(_.map(Backbone.sync.args, (args) -> args[1]), 'url')
      urls.should.eql [
        'undefined/api/v1/artist/foobar/artworks?published=true'
        'undefined/api/v1/related/posts?artist[]=foobar'
        'undefined/api/v1/related/shows?artist[]=foobar&sort=-end_at'
        '/artist/data/foobar/bibliography'
        '/artist/data/foobar/collections'
        'undefined/api/v1/related/layer/main/artists?artist[]=foobar&exclude_artists_without_artworks=true'
        'undefined/api/v1/related/layer/contemporary/artists?artist[]=foobar&exclude_artists_without_artworks=true'
      ]
      data = _.pluck(_.map(Backbone.sync.args, (args) -> args[2]), 'data')
      data.should.eql [
        { size: 1 }
        { size: 5 }
        { size: 5 }
        null
        null
        { size: 10 }
        { size: 10 }
      ]

  describe '#processReturns', ->
    it 'returns only sections who have collections that have non-zero lengths or sections with `always` set to true', ->
      @data.sync()
      _.pluck(@data.processReturns(), 'name').should.eql ['Overview']
      _.last(Backbone.sync.args)[2].success [fabricate 'artist']
      _.pluck(@data.processReturns(), 'name').should.eql ['Overview', 'Related Artists']
