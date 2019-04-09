benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'

describe 'splitTestMiddleware', ->
  before ->
    benv.setup (done) =>
      @splitTestMiddleware = rewire '../middleware'
      @splitTestMiddleware.__set__ 'qs', require('qs')
      @splitTestMiddleware.__set__ 'runningTests',
        header_design:
          key: 'header_design'
          outcomes: old: 0, new: 100
          edge: 'old'

        some_other_test:
          key: 'some_other_test'
          outcomes: old: 100, new: 0
          edge: 'new'

  after ->
    benv.teardown()

  beforeEach ->
    @req = cookies: {}
    @res = cookie: sinon.stub(), locals: sd: {}

  it 'sets up all the tests, and sets corresponding locals/cookies', (done) ->
    @splitTestMiddleware @req, @res, =>
      @res.locals.sd.should.eql HEADER_DESIGN: 'new', SOME_OTHER_TEST: 'old'
      @res.cookie.args.map((xs) -> xs[0..1]).should.eql [
        ['split_test--header_design', 'new']
        ['split_test--some_other_test', 'old']
      ]
      done()

  describe 'when admin', ->
    beforeEach ->
      @req = cookies: {}, user: isAdmin: -> true

    it 'drops the tests into the edge outcomes', (done) ->
      @splitTestMiddleware @req, @res, =>
        @res.locals.sd.should.eql HEADER_DESIGN: 'old', SOME_OTHER_TEST: 'new'
        done()

  describe 'when admin, with overriding params', ->
    beforeEach ->
      @res = cookie: sinon.stub(), locals: sd: {}
      @req =
        cookies: {}
        user: isAdmin: -> true
        query:
          split_test:
            header_design: 'new'

    it 'sets the tests to the query', (done) ->
      @splitTestMiddleware @req, @res, =>
        @res.locals.sd.should.eql HEADER_DESIGN: 'new', SOME_OTHER_TEST: 'new'
        done()

  describe 'no tests', ->
    before ->
      @splitTestMiddleware.__set__ 'runningTests', {}

    it 'just passes on to next', (done) ->
      @splitTestMiddleware @req, @res, =>
        @res.locals.sd.should.eql {}
        done()
