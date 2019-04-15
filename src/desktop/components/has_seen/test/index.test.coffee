benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'

describe 'hasSeen', ->
  beforeEach ->
    @hasSeen = rewire '../index'
    @Dismisser = @hasSeen.__get__ 'Dismisser'

  it 'should return false the first time it is called, then true every time after that', ->
    @hasSeen('barbaz').should.be.false()
    getStub = sinon.stub(@Dismisser::, 'get').returns 1
    @hasSeen('barbaz').should.be.true()
    @hasSeen('barbaz').should.be.true()
    getStub.restore()
