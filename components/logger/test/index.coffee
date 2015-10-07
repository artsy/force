sinon = require 'sinon'
rewire = require 'rewire'

describe 'Logger', ->
  beforeEach ->
    @Logger = rewire '../index'
    @Cookies = @Logger.__get__ 'Cookies'

    store = {}
    @Cookies.set = (name, value) -> store[name] = value
    @Cookies.get = (name) -> store[name]

    @logger = new @Logger 'test-logger'

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

  it 'logs things across instances of the same name', ->
    @logger.log 'foo'
    @logger.get().should.eql ['foo']

    logger = new @Logger 'test-logger'
    otherLogger = new @Logger 'other-test-logger'

    otherLogger.get().should.eql []

    logger.get().should.eql ['foo']

    logger.log 'bar'
    @logger.get().should.eql ['foo', 'bar']

    otherLogger.get().should.eql []

  it 'unlogs things', ->
    @logger.log 'foo'
    @logger.log 'bar'
    @logger.log 'baz'
    @logger.get().should.eql ['foo', 'bar', 'baz']
    @logger.unlog 'bar'
    @logger.get().should.eql ['foo', 'baz']

  describe '#hasLogged', ->
    it 'tells you if you logged something or not', ->
      @logger.log 'foo'
      @logger.log 'bar'
      @logger.get().should.eql ['foo', 'bar']

      @logger.hasLogged 'foo'
        .should.be.true()
      @logger.hasLogged 'bar'
        .should.be.true()
      @logger.hasLogged 'baz'
        .should.be.false()

    it 'tells you if you logged a list of things', ->
      @logger.log 'foo'
      @logger.log 'bar'

      @logger.hasLogged 'foo', 'bar'
        .should.be.true()
      @logger.hasLogged 'foo', 'bar', 'baz'
        .should.be.false()

  describe '#hasLoggedThisSession, #hasLoggedAnythingThisSession', ->
    beforeEach ->
      sinon.stub @logger, 'get'
        .returns ['foo', 'bar']

    afterEach ->
      @logger.get.restore()

    it 'maintains a separate array of steps for logging things seen only this go around', ->
      @logger.hasLogged 'foo', 'bar'
        .should.be.true()
      @logger.hasLogged 'baz'
        .should.be.false()
      @logger.hasLoggedAnythingThisSession()
        .should.be.false()
      @logger.hasLoggedThisSession 'foo'
        .should.be.false()

      @logger.log 'baz'

      @logger.hasLoggedAnythingThisSession()
        .should.be.true()
      @logger.hasLogged 'baz'
        .should.be.true()
      @logger.hasLoggedThisSession 'baz'
        .should.be.true()
