sinon = require 'sinon'
{ Predicate, maybePrerender } = require '../middleware'

describe 'Predicate', ->
  beforeEach ->
    sinon.stub(Predicate, 'coinToss').returns true

  afterEach ->
    Predicate.coinToss.restore()

  describe '#evaluate', ->
    before ->
      @url = '/artist/foo-bar'

    describe 'referrers', ->
      describe 'search', ->
        it 'parses the referrer and returns true when the type is search (50% of the time)', (done) ->
          referrer = 'https://www.google.com/url?q=whatever'
          Predicate.evaluate { url: @url, get: -> referrer }, ->
            true.should.be.true
            done()
          , ->
            false.should.be.true

      describe 'social', ->
        it 'falls through to the next', (done) ->
          referrer = 'https://www.twitter.com/foobar'
          Predicate.evaluate { url: @url, get: -> referrer }, ->
            false.should.be.true
          , ->
            true.should.be.true
            done()

      describe 'unknown', ->
        it 'falls through to the next', (done) ->
          Predicate.evaluate { url: @url, get: -> undefined }, ->
            false.should.be.true
          , ->
            true.should.be.true
            done()
