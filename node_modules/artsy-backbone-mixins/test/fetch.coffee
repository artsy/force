sinon = require 'sinon'
_ = require 'underscore'
Backbone = require 'backbone'
Fetch = require '../lib/fetch.coffee'

class Collection extends Backbone.Collection

  _.extend @prototype, Fetch('foobar')

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
        @collection.should.have.lengthOf 3
        done()
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success []

    it 'respects the starting page param passed in the options', (done) ->
      @collection.fetchUntilEnd
        data: { page: 5 }
        success: =>
          @collection.should.have.lengthOf 2
          done()
      Backbone.sync.args[0][2].data.page.should.equal 5
      Backbone.sync.args[0][2].success [{ foo: 'bar1' }, {foo: 'bar2'}]
      Backbone.sync.args[0][2].success []

    it 'runs the each callback on every page fetch', ->
      eachStub = sinon.stub()
      @collection.fetchUntilEnd each: eachStub
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success [{ foo: 'bar' }]
      Backbone.sync.args[0][2].success []
      eachStub.callCount.should.equal 4

describe 'fetch set items by key mixin', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @collection = new Collection

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchSetItemsByKey', ->

    it "fetches the items for the first set by a key", (done) ->
      @collection.fetchSetItemsByKey 'foo:bar', success: =>
        @collection.first().get('name').should.equal 'FooBar'
        done()
      Backbone.sync.args[0][2].success [
        {
          id: _.uniqueId()
          key: 'homepage:featured'
          item_type: 'FeaturedLink'
          display_on_mobile: true
          display_on_desktop: true
        }
        {
          id: _.uniqueId()
          key: 'homepage:featured'
          item_type: 'FeaturedLink'
          display_on_mobile: true
          display_on_desktop: true
        }
      ]
      Backbone.sync.args[1][2].url.should.match /// set/.*/items ///
      Backbone.sync.args[1][2].success [{ name: 'FooBar' }]

    it 'returns an empty collection if there are no sets', (done) ->
      @collection.fetchSetItemsByKey 'foo:bar', success: =>
        @collection.models.length.should.equal 0
        done()
      Backbone.sync.args[0][2].success []

    it 'retains the collections model definition', ->
      class Foo extends Backbone.Model
        fooId: 'bar'
      @collection.model = Foo
      @collection.fetchSetItemsByKey 'foo:bar', success: =>
        @collection.first().fooId.should.equal 'bar'
        done()
      Backbone.sync.args[0][2].success [{}]
