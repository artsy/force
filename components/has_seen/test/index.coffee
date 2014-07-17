benv = require 'benv'
sinon = require 'sinon'

describe 'hasSeen', ->
  beforeEach (done) ->
    benv.setup =>
      @hasSeen = require '../index'
      @Cookies = require 'cookies-js'
      @setSpy = sinon.spy @Cookies, 'set'

      done()

  afterEach ->
    @setSpy.restore()

  it 'should return false the first time it is called, then true every time after that', ->
    @hasSeen('foobar').should.be.false
    @hasSeen('foobar').should.be.true
    @hasSeen('foobar').should.be.true

  it 'should set a cookie with the name that it is called with', ->
    @hasSeen('barbaz')
    @Cookies.get('barbaz').should.equal 'true'
    @setSpy.args[0][0].should.eql 'barbaz'
    @setSpy.args[0][1].should.eql true
    @setSpy.args[0][2].should.have.key 'expires'

  it 'sets the default expires to one year (in seconds)', ->
    @hasSeen('bazqux')
    @setSpy.args[0][2].expires.should.equal 31536000

  it 'accepts an optional expires argument', ->
    @hasSeen('quxquux', 100)
    @setSpy.args[0][2].expires.should.equal 100
