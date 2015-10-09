_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
init = rewire '../index'

describe 'setupFilter', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

    @aggregations = ['dimension_range', 'medium', 'price_range', 'total', 'for_sale']
    @init = init
    @init.__set__ 'FilterView', sinon.stub()
    @init.__set__ 'FilterArtworks', constructor: sinon.stub(), fetch: sinon.stub()
    @init.__set__ 'FilterRouter', sinon.stub()

  after ->
    benv.teardown()

  beforeEach ->
    @init.setupFilter
      el: $ "<div></div>"
      defaultHeading: "Artworks"
      aggregations: @aggregations
      filterRoot:'/artworks'

   describe 'with no stuck params', ->
    it 'sets up the views and routers properly', ->
