_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Q = require 'bluebird-q'
Backbone = require 'backbone'
routes = rewire '../routes'
{ fabricate } = require 'antigravity'

describe 'Routes', ->

  beforeEach ->
    @req =
      query: {}

    @res =
      locals:
        sd: { METAPHYSICS_ENDPOINT: 'http://metaphysics.endpoint' }
        asset: (->)
      render: sinon.stub()

    @next = sinon.stub()
    routes.__set__ 'metaphysics', @metaphysics = sinon.stub()
    @metaphysics.returns Q.resolve {artwork: {title: 'untitled', year: '2016'}}

  describe '#index', ->
    it 'should render index page', (done) ->
      routes.index(@req, @res, @next)
      _.defer => _.defer =>
        @res.render.called.should.be.true
        @res.locals.artwork.title.should.equal 'untitled'
        @res.locals.artwork.year.should.equal '2016'
        @res.render.args[0][0].should.equal 'index'
        done()
