sinon = require 'sinon'
{ fabricate } = require 'antigravity'
_ = require 'underscore'
Backbone = require 'backbone'
fetchUntilEnd = require '../../../collections/mixins/fetch_until_end'

class Collection extends Backbone.Collection

  _.extend @prototype, fetchUntilEnd

  url: 'foo/bar'

describe 'fetch until end mixin', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @collection = new Collection

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchUntilEnd', ->

    it 'keeps fetching until the API returns no results', (done) ->
      @collection.fetchUntilEnd success: =>
        @collection.length.should.equal 3
        done()
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success []
