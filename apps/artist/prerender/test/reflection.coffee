rewire = require 'rewire'
sinon = require 'sinon'
Reflection = rewire '../reflection'
Reflection.__set__ 'cache', cache = get: sinon.stub(), set: sinon.stub()

describe 'Reflection', ->
  beforeEach ->
    @reflection = new Reflection path: '/artist/foo-bar'

  describe '#url', ->
    it 'returns the correct URL', ->
      @reflection.url().should.equal 'http://artsy-reflection.s3.amazonaws.com/__reflection/forceartsynet/artist/foo-bar'

  describe '#render', ->
    describe 'with a cached response', ->
      it 'returns the cached response', (done) ->
        @reflection.render (response) ->
          response.should.equal 'cached response'
          done()
        cache.get.args[0][0].should.equal 'http://artsy-reflection.s3.amazonaws.com/__reflection/forceartsynet/artist/foo-bar'
        cache.get.args[0][1](null, 'cached response')

    describe 'without a cached response', ->
      beforeEach ->
        sinon.stub(Reflection::, 'request').returns(end: (cb) -> cb(text: 'response'))

      afterEach ->
        Reflection::request.restore()

      it 'makes a request'
