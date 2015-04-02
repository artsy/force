benv = require 'benv'
sinon = require 'sinon'

describe 'hasSeen', ->

  beforeEach (done) ->
    benv.setup =>
      @hasSeen = require '../index'
      @Cookies = require '../../cookies/index.coffee'
      @setSpy = sinon.spy @Cookies, 'set'

      done()

  afterEach ->
    @setSpy.restore()
    benv.teardown()

  it 'should return false the first time it is called, then true every time after that', ->
    @hasSeen('foobar').should.be.false
    sinon.stub @Cookies, 'get'
    @Cookies.get.returns true
    @hasSeen('foobar').should.be.true
    @hasSeen('foobar').should.be.true
    @Cookies.get.restore()

  it 'should set a cookie with the name that it is called with', ->
    @hasSeen('barbaz')
    sinon.stub @Cookies, 'get'
    @Cookies.get.returns true
    @Cookies.get('barbaz').should.equal true
    @setSpy.args[0][0].should.eql 'barbaz'
    @setSpy.args[0][1].should.eql true
    @setSpy.args[0][2].should.have.key 'expires'
    @Cookies.get.restore()

  it 'sets the default expires to one year (in seconds)', ->
    @hasSeen('bazqux')
    @setSpy.args[0][2].expires.should.equal 31536000

  it 'accepts an optional expires argument', ->
    @hasSeen('quxquux', 100)
    @setSpy.args[0][2].expires.should.equal 100
