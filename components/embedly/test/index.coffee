benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Embedly = require '../index'

describe 'Embedly', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @embedly = new Embedly

  afterEach ->
    Backbone.sync.restore()

  it 'assembles the passed in URLs in format that Embedly expects', ->
    @embedly.fetch data: urls: ['http://artsy.net', 'http://artsy.pizza']
    Backbone.sync.args[0][2].data.should.containEql 'urls=http%3A%2F%2Fartsy.net&urls=http%3A%2F%2Fartsy.pizza'
