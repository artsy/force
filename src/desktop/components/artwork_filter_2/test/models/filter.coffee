Q = require 'bluebird-q'
sinon = require 'sinon'
rewire = require 'rewire'
metaphysics = require '../../../../../lib/metaphysics.coffee'
Backbone = require 'backbone'
Params = require '../../models/params.coffee'
Counts = require '../../models/counts.coffee'
Filter = rewire '../../models/filter.coffee'
query = require '../../queries/counts.coffee'
response = require '../fixtures/metaphysics_counts_response.json'

describe 'Filter', ->
  metaphysics = null
  params = null
  counts = null
  filter = null

  beforeEach ->
    Filter.__set__ 'metaphysics', metaphysics = sinon.stub()
    metaphysics.returns Q.resolve response

  setup = (options) ->
    params = new Params options
    params.filterParamKeys = ['medium', 'period', 'gallery', 'institution']

    counts = new Counts
      params: params

    filter = new Filter
      params: params
      artist_id: 'andy-warhol'

    filter

  it 'should fetch with params', ->
    setup().fetch()
    Object.keys(metaphysics.args[0][0].variables).should.containDeep(['page', 'size', 'sort', 'artist_id'])

  it 'it should update fetch with new params', ->
    filter = setup({ name: 'foo' })
    filter.fetch()
    Object.keys(metaphysics.args[0][0].variables).should.containDeep(['page', 'size', 'name', 'sort', 'artist_id'])

    filter.params.unset('name')
    filter.set('isLoading', false)
    filter.fetch()
    Object.keys(metaphysics.args[1][0].variables).should.containDeep(['page', 'size', 'sort', 'artist_id'])
