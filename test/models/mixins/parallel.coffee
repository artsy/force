_ = require 'underscore'
sd = require('sharify').data
sinon = require 'sinon'
Backbone = require 'backbone'
Parallel = require '../../../models/mixins/parallel'

class Collection extends Backbone.Collection
  _.extend @prototype, Parallel

describe 'Parallel mixin', ->
  beforeEach ->
    @collection = new Collection
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchUntilEndInParallel', ->
    it 'sets total_count', ->
      @collection.fetchUntilEndInParallel()
      Backbone.sync.args[0][2].data.should.have.keys('total_count', 'size')

    it 'queues up the remaining pages', ->
      @collection.fetchUntilEndInParallel()
      Backbone.sync.args[0][2].res = headers: 'x-total-count': 77
      Backbone.sync.args[0][2].success([])
      _.map(Backbone.sync.args, (args) -> args[2].data).should.eql [
        { total_count: 1, size: 10 }
        { page: 2, total_count: 1, size: 10 }
        { page: 3, total_count: 1, size: 10 }
        { page: 4, total_count: 1, size: 10 }
        { page: 5, total_count: 1, size: 10 }
        { page: 6, total_count: 1, size: 10 }
        { page: 7, total_count: 1, size: 10 }
        { page: 8, total_count: 1, size: 10 }
      ]

    it 'maintains the original options', ->
      @collection.fetchUntilEndInParallel(data: zone: 'no-flex', size: 12)
      Backbone.sync.args[0][2].res = headers: 'x-total-count': 25
      Backbone.sync.args[0][2].success([])
      _.map(Backbone.sync.args, (args) -> args[2].data).should.eql [
        { zone: 'no-flex', total_count: 1, size: 12 }
        { page: 2, zone: 'no-flex', total_count: 1, size: 12 }
        { page: 3, zone: 'no-flex', total_count: 1, size: 12 }
      ]

    it 'returns early if we are done on the first fetch', (done) ->
      @collection.fetchUntilEndInParallel().then ->
        Backbone.sync.callCount.should.equal 1
        done()
      Backbone.sync.args[0][2].res = headers: 'x-total-count': 2
      Backbone.sync.args[0][2].success(['x', 'x'])

    it 'rejects the promise if it errors early', (done) ->
      @collection.fetchUntilEndInParallel().then((->), (-> done()))
      Backbone.sync.args[0][2].res = headers: 'x-total-count': 20
      Backbone.sync.args[0][2].error()

    it 'supports the success callback'

    it 'supports the error callback'

    it 'maintains the paged order'

