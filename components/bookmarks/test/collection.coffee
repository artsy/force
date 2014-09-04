sinon = require 'sinon'
Backbone = require 'backbone'
Bookmarks = require '../collection'

describe 'Bookmarks', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

    @bookmarks = new Bookmarks
    @bookmarks.add id: 'foo', interest: id: 'bar'
    @bookmarks.add id: 'bar', interest: id: 'baz'

  afterEach ->
    Backbone.sync.restore()

  describe '#findByInterestId', ->
    it 'can find a bookmark by the interest id', ->
      @bookmarks.findByInterestId('bar').id.should.equal 'foo'

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
      bookmark.get('interest').id.should.equal 'qux'
      bookmark.get('interest_id').should.equal 'qux'
      bookmark.get('category').should.equal 'collected_before'
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].attributes.interest_id.should.equal 'qux'
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/me/user_interest'

    it 'rejects duplicate artists', ->
      @bookmarks.createFromArtist new Backbone.Model id: 'qux'
      @bookmarks.createFromArtist new Backbone.Model id: 'qux'
      @bookmarks.length.should.equal 3
      Backbone.sync.callCount.should.equal 1

  describe '#parse', ->
    it 'ignores bookmarks without an interest', ->
      @bookmarks.reset([
        { interest_id: 'foo', interest: null }
        { interest_id: 'bar', interest: 'existy' }
        { interest_id: 'baz', interest: 'existy' }
        { interest_id: 'qux', interest: null }
      ], parse: true)
      @bookmarks.pluck('interest_id').should.eql ['bar', 'baz']
