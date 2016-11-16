_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
request = require 'superagent'
JSONPage = rewire '../index'
JSONPage.__set__
  S3_KEY: 'test_key'
  S3_SECRET: 'test_secret'
  APPLICATION_NAME: 'test_name'

describe 'JSONPage', ->
  beforeEach ->
    @page = new JSONPage name: 'test'

  describe '#path', ->
    it 'returns a path to the JSON file on S3', ->
      @page.path().should.equal '/json/test.json'

  describe '#client', ->
    it 'returns the S3 client', ->
      @page.client().options.should.eql
        key: 'test_key'
        secret: 'test_secret'
        bucket: 'test_name'

  describe '#get', ->
    describe 'successful', ->
      beforeEach ->
        sinon.stub(request, 'get')
          .returns end: (cb) ->
            cb null, ok: true, text: JSON.stringify(header: headline: 'test headline')

      afterEach ->
        request.get.restore()

      it 'fetches and parses the page data', (done) ->
        @page.get (err, data) ->
          data.header.headline.should.equal 'test headline'
          done()

      it 'returns a promise; resolves with the parsed page data', (done) ->
        @page.get().done (data) ->
          data.header.headline.should.equal 'test headline'
          done()

    describe 'unsuccessful', ->
      beforeEach ->
        sinon.stub(request, 'get')
          .returns end: (cb) ->
            cb {}, ok: false, error: 'cannot GET /json/wrong.json (403)'

      afterEach ->
        request.get.restore()

      it 'calls back with the error', (done) ->
        @page.get (err, data) ->
          err.message.should.equal 'cannot GET /json/wrong.json (403)'
          done()

      it 'returns a promise; rejects with the error', ->
        @page.get()
          .catch (err) ->
            err.message.should.equal 'cannot GET /json/wrong.json (403)'

    describe 'unsuccessful, without a response', ->
      beforeEach ->
        sinon.stub(request, 'get')
          .returns end: (cb) ->
            cb response: 'cannot GET /json/wrong.json (403)'

      afterEach ->
        request.get.restore()

      it 'calls back with the error', (done) ->
        @page.get (err, data) ->
          err.message.should.equal 'cannot GET /json/wrong.json (403)'
          done()

  describe '#set', ->
    beforeEach ->
      sinon.stub(JSONPage::, 'client')
        .returns putBuffer: @putBufferStub = sinon.stub()#.yields()

    afterEach ->
      @page.client.restore()

    it 'uploads the data to S3', (done) ->
      data = header: headline: 'new test headline'
      @page.set data, (err, response) =>
        response.should.equal data
        done()
      @putBufferStub.args[0][0].toString().should.equal JSON.stringify data
      @putBufferStub.args[0][3](null, data)
