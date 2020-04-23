sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
metaphysics2 = rewire '../../lib/metaphysics2'

describe 'metaphysics2', ->
  beforeEach ->
    @__request__ = metaphysics2.__get__ 'request'

    @request = {}
    @request.timeout = sinon.stub().returns @request
    @request.set = sinon.stub().returns @request
    @request.get = sinon.stub().returns @request
    @request.query = sinon.stub().returns @request
    @request.post = sinon.stub().returns @request
    @request.send = sinon.stub().returns @request
    @request.end = sinon.stub().returns @request

    metaphysics2.__set__ 'request', @request
    metaphysics2.__set__ 'METAPHYSICS_ENDPOINT', 'https://metaphysics.test'

  afterEach ->
    metaphysics2.__set__ 'request', @__request__

  it 'accepts a query and variables and makes a request to the v2 METAPHYSICS_ENDPOINT', ->
    @request.end.yields null, ok: true, body: data: artist: id: 'foo-bar'

    metaphysics2
      variables: variables = id: 'foo-bar', size: 3
      query: query = '
        query artist($id: String!) {
          artist(id: $id) {
            id
          }
        }
      '
    .then =>
      @request.set.args.should.eql [
        ['Accept', 'application/json'],
        ['X-Request-Id', 'implement-me']
      ]
      @request.get.called.should.be.false()
      @request.post.args[0][0].should.equal 'https://metaphysics.test/v2'
      @request.send.args[0][0].query.should.equal query
      @request.send.args[0][0].variables.should.equal variables

  describe 'success', ->
    it 'yields with the data', ->
      @request.end.yields null, ok: true, body: data: artist: id: 'foo-bar'

      metaphysics2
        variables: id: 'foo-bar'
        query: '
          query artist($id: String!) {
            artist(id: $id) {
              id
            }
          }
        '
      .then (data) ->
        data.should.eql artist: id: 'foo-bar'

  describe 'error', ->
    it 'rejects with the error', ->
      @request.end.yields new Error 'some error'

      metaphysics2
        variables: id: 'foo-bar'
        query: '
          query artist($id: String!) {
            artist(id: $id) {
              id
            }
          }
        '
      .catch (err) ->
        err.message.should.equal 'some error'

    it 'includes the data', ->
      @request.end.yields null,
        body:
          errors: [message: 'some error']
          data: foo: 'bar'

      metaphysics2
        variables: id: 'foo-bar'
        query: '
          query artist($id: String!) {
            artist(id: $id) {
              id
            }
          }
        '
      .catch (err) ->
        err.data.foo.should.equal 'bar'

  describe 'partial error', ->
    it 'rejects with the errors', ->
      @request.end.yields null, ok: true, body:
        data: artist: id: 'foo-bar'
        errors: [message: 'some error']

      metaphysics2
        variables: id: 'foo-bar'
        query: '
          query artist($id: String!) {
            artist(id: $id) {
              id
            }
          }
        '
      .catch (err) ->
        err.message.should.equal """[{"message":"some error"}]"""

    it 'sets a status code of 404 if ANY of the errors contain a "Not Found" message', ->
      @request.end.yields null, ok: true, body:
        data: artist: id: 'foo-bar'
        errors: [message: 'Artwork Not Found']

      metaphysics2
        variables: id: 'foo-bar'
        query: '
          query artist($id: String!) {
            artist(id: $id) {
              id
            }
          }
        '
      .catch (err) ->
        err.status.should.equal 404

  describe 'user auth', ->
    beforeEach ->
      @user = new Backbone.Model accessToken: 'xxx', id: '007'

    it 'optionally accepts a req object, from which it extracts the user access token', ->
      @request.end.yields null, ok: true, body: data: {}

      metaphysics2 req: user: @user, id: 'foo'
        .then =>
          @request.set.args
            .should.eql [
              ['Accept', 'application/json']
              ['X-Request-Id', 'foo']
              ['X-ACCESS-TOKEN': 'xxx']
              ['X-USER-ID': '007']
            ]

  describe 'request id', ->
    it 'optionally accepts a req object, from which it extracts the request id', ->
      @request.end.yields null, ok: true, body: data: {}

      metaphysics2 req: id: 'foo'
        .then =>
          @request.set.args
            .should.eql [
              ['Accept', 'application/json']
              ['X-Request-Id', 'foo']
            ]

    describe 'x forwarded for', ->
      it 'optionally accepts a req object, from which it constructs the x-forwarded-for header if the request has a remote address', ->
        @request.end.yields null, ok: true, body: data: {}

        metaphysics2 req: connection: remoteAddress: '::ffff:127.0.0.1'
          .then =>
            @request.set.args
              .should.eql [
                ['Accept', 'application/json']
                ['X-Request-Id', 'implement-me']
                ['X-Forwarded-For', '127.0.0.1']
              ]
