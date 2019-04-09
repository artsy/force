sinon = require 'sinon'
Backbone = require 'backbone'
UserInterests = require '../../collections/user_interests'

describe 'UserInterests', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

    @userInterests = new UserInterests
    @userInterests.add id: 'foo', interest: id: 'bar'
    @userInterests.add id: 'bar', interest: id: 'baz'

  afterEach ->
    Backbone.sync.restore()

  describe '#findByInterestId', ->
    it 'can find a userInterest by the interest id', ->
      @userInterests.findByInterestId('bar').id.should.equal 'foo'

  describe '#addInterest', ->
    it 'accepts a model and adds a userInterest with it', ->
      @userInterests.length.should.equal 2
      @userInterests.addInterest new Backbone.Model id: 'qux'
      @userInterests.length.should.equal 3
      Backbone.sync.called.should.be.false()

    it 'rejects duplicate models', ->
      @userInterests.addInterest new Backbone.Model id: 'qux'
      @userInterests.addInterest new Backbone.Model id: 'qux'
      @userInterests.length.should.equal 3
      Backbone.sync.callCount.should.equal 0

  describe '#parse', ->
    it 'ignores userInterests that are... *uninteresting*', ->
      @userInterests.reset [
        { interest_id: 'foo', interest: null }
        { interest_id: 'bar', interest: 'existy' }
        { interest_id: 'baz', interest: 'existy' }
        { interest_id: 'qux', interest: null }
      ], parse: true
      @userInterests.pluck('interest_id').should.eql ['bar', 'baz']
