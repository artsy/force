sinon = require 'sinon'
rewire = require 'rewire'
cacheBusting = rewire '../../../lib/middleware/cache_busting'

describe 'cache busting', ->

  beforeEach ->
    cacheBusting.__set__ 'client', @client = { del: sinon.stub() }

  describe '#bustFairCache', ->

    beforeEach ->
      @req = { params: { id: 'cat-fair' } }
      @res = { redirect: sinon.stub() }

    it 'deletes the fair key in redis', ->
      cacheBusting.bustFairCache @req, @res, ->
      @client.del.args[0][0].should.equal 'fair:cat-fair'
      @res.redirect.args[0][0].should.equal '/cat-fair'