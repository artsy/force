_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
FilterRouter = require '../index.coffee'

describe 'FilterRouter', ->

  beforeEach ->
    @router = new FilterRouter params: new Backbone.Model

  afterEach ->
    benv.teardown()

  describe '#navigate', ->

    it 'reflects the filter params as query params in the url', ->
      @router.navigate = sinon.stub()
      @router.params.set { foo: 'bar' }
      @router.navigate.args[0][0].should.containEql '/artworks?foo=bar'

    it 'omits page from the params', ->
      @router.navigate = sinon.stub()
      @router.params.set { page: '10' }
      @router.navigate.args[0][0].should.not.containEql 'page=10'

  describe '#artworks', ->

    it 'sets the filter params', ->
      global.location = search: "?foo=bar"
      @router.artworks()
      @router.params.get('foo').should.equal 'bar'
