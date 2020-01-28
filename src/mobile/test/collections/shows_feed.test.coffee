sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
ShowsFeed = require '../../collections/shows_feed'

describe 'ShowsFeed', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @shows = new ShowsFeed [
      fabricate 'show'
      fabricate 'show'
    ]

  afterEach ->
    Backbone.sync.restore()

  describe '#parse', ->

    it 'returns the results from the json', ->
      @shows.parse({ results: [{ foo: 'bar' }]})[0].foo.should.equal 'bar'

    it 'sets the next cursor', ->
      @shows.parse({ next: 'foobar' })
      @shows.nextCursor.should.equal 'foobar'

  describe '#nextPage', ->

    beforeEach ->
      @shows.nextCursor = 'foobar'
      @shows.nextPage()

    it 'fetches the next page of results based off the last cursor', ->
      Backbone.sync.args[0][2].data.cursor.should.equal 'foobar'

    it 'adds to the collection', ->
      Backbone.sync.args[0][2].remove.should.equal false

    it 'doesnt fetch any further if the cursor is the same', ->
      Backbone.sync.args[0][2].success { results: [], next: 'foo' }
      @shows.nextPage()
      Backbone.sync.args[1][2].success { results: [], next: 'foo' }
      @shows.nextPage().should.equal false
      (Backbone.sync.args[2]?).should.not.be.ok()
