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

  it 'with equal weighting, requires outcomes to be an array with at least 2 entries', ->
    (=> new @SplitTest key: 'foobar', weighting: 'equal', outcomes: foo: 50, bar: 40)
      .should.throw 'The `outcomes` param must be an array of > 1'
    (=> new @SplitTest key: 'foobar', weighting: 'equal', outcomes: ['foo'])
      .should.throw 'The `outcomes` param must be an array of > 1'
    (=> new @SplitTest key: 'foobar', weighting: 'equal', outcomes: ['foo', 'bar'])
      .should.not.throw 'The `outcomes` param must be an array of > 1'

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

  describe 'reflection', ->
    beforeEach ->
      @reflectionStub = sinon.stub(@SplitTest::, 'reflection').returns true

    afterEach ->
      @reflectionStub.restore()

    it 'outcome is set to control group if request comes from Reflection', ->
      test = new @SplitTest key: 'foobar', edge: 'baz', outcomes: control: 10, qux: 90
      test.outcome().should.equal 'control'
    
    it 'outcome should be set to specified control group key', ->
      test = new @SplitTest key: 'foobar', edge: 'baz', control_group: 'old', outcomes: old: 10, qux: 90
      test.outcome().should.equal 'old'
