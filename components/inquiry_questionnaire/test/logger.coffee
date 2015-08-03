sinon = require 'sinon'
rewire = require 'rewire'

describe 'Logger', ->
  beforeEach ->
    @Logger = rewire '../logger'
    @Cookies = @Logger.__get__ 'Cookies'

    store = {}
    @Cookies.set = (name, value) -> store[name] = value
    @Cookies.get = (name) -> store[name]

    @logger = new @Logger

  it 'initializes the value as empty array', ->
    @logger.get().should.eql []

  it 'logs things', ->
    @logger.log 'foo'
    @logger.get().should.eql ['foo']
    @logger.log 'bar'
    @logger.get().should.eql ['foo', 'bar']
    @logger.log 'baz'
    @logger.get().should.eql ['foo', 'bar', 'baz']

    @logger.log 'foo'
    @logger.get().should.eql ['foo', 'bar', 'baz']

  it 'logs things across instances', ->
    @logger.log 'foo'
    @logger.get().should.eql ['foo']

    logger = new @Logger
    logger.get().should.eql ['foo']

    logger.log 'bar'
    @logger.get().should.eql ['foo', 'bar']

  describe '#hasLogged', ->
    it 'tells you if you logged something or not', ->
      @logger.log 'foo'
      @logger.log 'bar'
      @logger.get().should.eql ['foo', 'bar']

      @logger.hasLogged('foo').should.be.true()
      @logger.hasLogged('bar').should.be.true()
      @logger.hasLogged('baz').should.be.false()
