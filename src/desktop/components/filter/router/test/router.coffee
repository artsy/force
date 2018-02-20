_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
FilterRouter = rewire '../index.coffee'

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

    it 'does not include page in the url params', ->
      @router.navigate = sinon.stub()
      @router.params.set { page: '10', foo: 'bar' }
      @router.navigate.args[0][0].should.containEql '/artworks?foo=bar'

    it 'does not route if no params in the url', ->
      @router.navigate = sinon.stub()
      @router.params.set { page: '10' }
      @router.navigate.callCount.should.equal 0

  describe '#artworks', ->

    it 'sets the filter params', ->
      FilterRouter.__set__ 'location', search: "?foo=bar"
      @router.artworks()
      @router.params.get('foo').should.equal 'bar'
