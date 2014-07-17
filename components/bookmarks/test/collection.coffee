sinon = require 'sinon'
Backbone = require 'backbone'
Bookmarks = require '../collection'

describe 'Bookmarks', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

    @bookmarks = new Bookmarks
    @bookmarks.add id: 'foo', artist: id: 'bar'
    @bookmarks.add id: 'bar', artist: id: 'baz'

  afterEach ->
    Backbone.sync.restore()

  describe '#findByArtistId', ->
    it 'can find a bookmark by the artist id', ->
      @bookmarks.findByArtistId('bar').id.should.equal 'foo'

  describe '#newFromArtist', ->
    it 'accepts an artist(-like) model and news up a bookmark from it', ->
      @bookmarks.length.should.equal 2
      @bookmarks.newFromArtist new Backbone.Model id: 'qux'
      @bookmarks.length.should.equal 3
      Backbone.sync.called.should.be.false

    it 'rejects duplicate artists', ->
      @bookmarks.newFromArtist new Backbone.Model id: 'qux'
      @bookmarks.newFromArtist new Backbone.Model id: 'qux'
      @bookmarks.length.should.equal 3
      Backbone.sync.callCount.should.equal 0

  describe '#createFromArtist', ->
    it 'accepts an artist(-like) model and creates a bookmark from it', ->
      @bookmarks.length.should.equal 2
      @bookmarks.createFromArtist new Backbone.Model id: 'qux'
      @bookmarks.length.should.equal 3
      bookmark = @bookmarks.first()
      bookmark.get('artist').id.should.equal 'qux'
      bookmark.get('artist_id').should.equal 'qux'
      bookmark.get('bookmark_type').should.equal 'collecting'
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].attributes.artist_id.should.equal 'qux'
      Backbone.sync.args[0][1].url().should.include '/api/v1/me/bookmark/artist'

    it 'rejects duplicate artists', ->
      @bookmarks.createFromArtist new Backbone.Model id: 'qux'
      @bookmarks.createFromArtist new Backbone.Model id: 'qux'
      @bookmarks.length.should.equal 3
      Backbone.sync.callCount.should.equal 1

  describe '#parse', ->
    it 'ignores bookmarks without an artist', ->
      @bookmarks.reset([
        { artist_id: 'foo', artist: null }
        { artist_id: 'bar', artist: 'existy' }
        { artist_id: 'baz', artist: 'existy' }
        { artist_id: 'qux', artist: null }
      ], parse: true)
      @bookmarks.pluck('artist_id').should.eql ['bar', 'baz']
