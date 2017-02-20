sinon = require 'sinon'
rewire = require 'rewire'

describe 'trustRedirect', ->
  beforeEach ->
    @trustRedirect = rewire '../../lib/trust_redirect'
    @trustRedirect.__set__ 'ajax', @ajax = sinon.stub()
    @trustRedirect.__set__ 'location', @location = sinon.stub()

  describe 'while not logged in', ->
    it 'redirects without bothering to try to get the token', ->
      @trustRedirect '/foobar'
      @ajax.called.should.be.false()
      @location.called.should.be.true()
      @location.args[0][0].should.equal '/foobar'

  describe 'while logged in', ->
    beforeEach ->
      @trustRedirect.__set__ 'CURRENT_USER', 'existy'

    describe 'success', ->
      beforeEach ->
        @ajax.yieldsTo 'success', trust_token: 'xxxx'

      it 'tries to get and append the trust token before redirecting', ->
        @trustRedirect '/foobar'
        @ajax.called.should.be.true()
        @location.called.should.be.true()
        @location.args[0][0].should.equal '/foobar?trust_token=xxxx'

      it 'preserves existing query params', ->
        @trustRedirect '/foobar?bar=baz'
        @ajax.called.should.be.true()
        @location.called.should.be.true()
        @location.args[0][0].should.equal '/foobar?bar=baz&trust_token=xxxx'

    describe 'error', ->
      beforeEach ->
        @ajax.yieldsTo 'error'

      it 'redirects to the normal path', ->
        @trustRedirect '/foobar'
        @ajax.called.should.be.true()
        @location.called.should.be.true()
        @location.args[0][0].should.equal '/foobar'
