benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'

describe 'Dismisser', ->
  beforeEach ->
    @Dismisser = rewire '../dismisser'
    @Cookies = @Dismisser.__get__ 'Cookies'

    store = {}
    @Cookies.set = (name, value) -> store[name] = value
    @Cookies.get = (name) -> store[name]

    @dismisser = new @Dismisser name: 'foobar', limit: 3

  describe '#dismiss', ->
    it 'pushes the value to the limit', ->
      @dismisser.get().should.equal 0
      @dismisser.dismissed().should.be.false()
      @dismisser.dismiss()
      @dismisser.get().should.equal 3
      @dismisser.dismissed().should.be.true()

  describe '#dismissed', ->
    it 'returns false until the limit is reached', ->
      @dismisser.dismissed().should.be.false()
      @dismisser.get().should.equal 0
      @dismisser.tick()
      @dismisser.dismissed().should.be.false()
      @dismisser.get().should.equal 1
      @dismisser.tick()
      @dismisser.dismissed().should.be.false()
      @dismisser.get().should.equal 2
      @dismisser.tick()
      @dismisser.dismissed().should.be.true()
      @dismisser.get().should.equal 3
