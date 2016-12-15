_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'

describe 'AuctionResultsRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @AuctionResultsRouter = rewire '../../client/router'
      @AuctionResultsRouter.__set__ 'DetailView', (@detailStub = sinon.stub())
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @AuctionResultsRouter::close = (@closeStub = sinon.stub())
    @router = new @AuctionResultsRouter

  describe '#initialize', ->
    it 'sets the original path', ->
      @router.originalPath.should.be.an.instanceOf String

  describe '#details', ->
    it 'calls out to #close if the originalPath is the same as the current path', ->
      @router.details()
      @closeStub.called.should.be.ok()

    it 'news up a DetailView if the path is different', ->
      @router.originalPath = 'something/else'
      @router.details()
      @closeStub.called.should.not.be.ok()
      @detailStub.called.should.be.ok()
