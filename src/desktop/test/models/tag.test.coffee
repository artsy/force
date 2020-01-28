_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Tag = require '../../models/tag.coffee'
sinon = require 'sinon'

describe "Tag", ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @tag = new Tag(fabricate 'tag')

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchFilterSuggest', ->

    it 'fetches the filter meta data', (done) ->
      @tag.fetchFilterSuggest { sort: '-foo' }, success: (m, res) ->
        res.total.should.equal 100
        done()
      Backbone.sync.args[0][2].data.sort.should.equal '-foo'
      Backbone.sync.args[0][2].success { total: 100 }
