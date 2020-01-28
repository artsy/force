sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'
Backbone = require 'backbone'
setItems = require '../../../models/mixins/set_items'

class Model extends Backbone.Model

  _.extend @prototype, setItems('FooModelName')

describe 'Set Items Mixin', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @model = new Model

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchSetItems', ->

    it 'fetches a set of items based on the mixed in model', ->
      @model.set id: 'foobar'
      @model.fetchSetItems()
      Backbone.sync.args[0][2].url.should.containEql(
        '/api/v1/sets?owner_type=FooModelName&owner_id=foobar'
      )
      Backbone.sync.args[0][2].success([ fabricate('set', display_on_martsy: true) ])
      Backbone.sync.args[1][2].url.should.match /// api/v1/set/.*/items ///

    it 'maps the items into an array of hashes that have the sets included', (done) ->
      @model.set id: 'foobar'
      @model.fetchSetItems success: (setItems) ->
        for { set, items } in setItems
          set.get('name').should.equal 'A Lovely Set'
          items.first().get('title').should.equal 'A Lovely Featured Link'
        done()
      Backbone.sync.args[0][2].success([fabricate 'set', name: 'A Lovely Set', display_on_martsy: true])
      Backbone.sync.args[1][2].success([
        fabricate 'featured_link', title: 'A Lovely Featured Link', display_on_martsy: true
      ])

    it 'passes a large size to accomodate large sets', ->
      @model.set id: 'foobar'
      @model.fetchSetItems()
      Backbone.sync.args[0][2].success([fabricate 'set', name: 'A Lovely Set', display_on_martsy: true])
      Backbone.sync.args[1][2].data.size.should.equal 50
