benv = require 'benv'
sinon = require 'sinon'
runningTests =
  # Example test
  header_design:
    key: 'header_design'
    outcomes:
      old: 80
      new: 20
    edge: 'new'

describe 'SplitTest', ->
  beforeEach (done) ->
    benv.setup =>
      @SplitTest = require '../split_test.coffee'
      @setStub = sinon.stub(@SplitTest::, 'set').returnsArg(0)
      done()

  afterEach ->
    @setStub.restore()
    benv.teardown()

  it 'requires probabilities to add up to 100', ->
    (=> new @SplitTest key: 'foobar', outcomes: foo: 50, bar: 40)
      .should.throw 'Your probability values for outcomes must add up to 100'
    (=> new @SplitTest key: 'foobar', outcomes: foo: 50, bar: 50)
      .should.not.throw 'Your probability values for outcomes must add up to 100'

  describe '#_key', ->
    it 'sets a key for the test which is used for the cookie and as an analytics property', ->
      test = new @SplitTest key: 'foobar', outcomes: foo: 0, bar: 100
      test._key().should.equal 'split_test--foobar'

  describe '#cssClass', ->
    it 'returns a string that is usable as a CSS class', ->
      test = new @SplitTest key: 'foobar', outcomes: foo: 0, bar: 100
      test.outcome().should.equal 'bar'
      test.cssClass().should.equal 'is-splittest-foobar--bar'

  describe 'logged in admin', ->
    beforeEach ->
      @adminStub = sinon.stub(@SplitTest::, 'admin').returns true

    afterEach ->
      @adminStub.restore()

    it 'presents the admin with edge functionality', ->
      adminTest = new @SplitTest key: 'foobar', edge: 'baz', outcomes: baz: 0, qux: 100
      adminTest.admin().should.be.true()
      adminTest.outcome().should.equal 'baz'
