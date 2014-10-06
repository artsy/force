benv = require 'benv'
sinon = require 'sinon'
runningTests = require '../running_tests.coffee'

describe 'SplitTest', ->
  beforeEach (done) ->
    benv.setup =>
      @SplitTest = require '../split_test.coffee'
      @setStub = sinon.stub(@SplitTest::, 'set').returnsArg(0)
      done()

  afterEach ->
    @setStub.restore()

  it 'requires probabilities to add up to 1.0', ->
    (=> new @SplitTest key: 'foobar', outcomes: foo: 0.5, bar: 0.4)
      .should.throw 'Your probability values for outcomes must add up to 1.0'
    (=> new @SplitTest key: 'foobar', outcomes: foo: 0.5, bar: 0.5)
      .should.not.throw 'Your probability values for outcomes must add up to 1.0'

  describe '#_key', ->
    it 'sets a key for the test which is used for the cookie and as an analytics property', ->
      test = new @SplitTest key: 'foobar', outcomes: foo: 0.0, bar: 1.0
      test._key().should.equal 'split_test--foobar'

  describe '#cssClass', ->
    it 'returns a string that is usable as a CSS class', ->
      test = new @SplitTest key: 'foobar', outcomes: foo: 0.0, bar: 1.0
      test.outcome().should.equal 'bar'
      test.cssClass().should.equal 'is-splittest-foobar--bar'

  describe 'logged in admin', ->
    beforeEach ->
      @adminStub = sinon.stub(@SplitTest::, 'admin').returns true

    afterEach ->
      @adminStub.restore()

    it 'presents the admin with edge functionality', ->
      adminTest = new @SplitTest key: 'foobar', edge: 'baz', outcomes: baz: 0.0, qux: 1.0
      adminTest.admin().should.be.true
      adminTest.outcome().should.equal 'baz'
