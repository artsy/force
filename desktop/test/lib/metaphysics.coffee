sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
metaphysics = rewire '../../lib/metaphysics'

describe 'metaphysics', ->
  beforeEach ->
    @__request__ = metaphysics.__get__ 'request'

    @request = {}
    @request.set = sinon.stub().returns @request
    @request.get = sinon.stub().returns @request
    @request.query = sinon.stub().returns @request
    @request.post = sinon.stub().returns @request
    @request.send = sinon.stub().returns @request
    @request.end = sinon.stub().returns @request

    metaphysics.__set__ 'request', @request
    metaphysics.__set__ 'METAPHYSICS_ENDPOINT', 'https://metaphysics.test'

  afterEach ->
    metaphysics.__set__ 'request', @__request__

  it 'accepts a query and variables and makes a request to the METAPHYSICS_ENDPOINT', ->
    @request.end.yields null, ok: true, body: data: artist: id: 'foo-bar'

    metaphysics
      variables: variables = id: 'foo-bar', size: 3
      query: query = '
        query artist($id: String!) {
          artist(id: $id) {
            id
          }
        }
      '
    .then =>
      @request.post.called.should.be.false()
      @request.send.called.should.be.false()
      @request.get.args[0][0].should.equal 'https://metaphysics.test'
      @request.set.args.should.eql [
        ['Accept', 'application/json']
      ]
      @request.query.args[0][0].query.should.equal query
      @request.query.args[0][0].variables.should.equal '{"id":"foo-bar","size":3}'

  it 'optionally can make POST requests', ->
    @request.end.yields null, ok: true, body: data: artist: id: 'foo-bar'

    metaphysics
      method: 'post'
      variables: variables = id: 'foo-bar', size: 3
      query: query = '
        query artist($id: String!) {
          artist(id: $id) {
            id
          }
        }
      '
    .then =>
      @request.get.called.should.be.false()
      @request.post.args[0][0].should.equal 'https://metaphysics.test'
      @request.send.args[0][0].query.should.equal query
      @request.send.args[0][0].variables.should.equal variables

  describe 'success', ->
    it 'yields with the data', ->
      @request.end.yields null, ok: true, body: data: artist: id: 'foo-bar'

      metaphysics
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

      metaphysics
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

      metaphysics
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

      metaphysics
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

      metaphysics
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

      metaphysics req: user: @user
        .then =>
          @request.set.args
            .should.eql [
              ['Accept', 'application/json']
              ['X-ACCESS-TOKEN': 'xxx']
              ['X-USER-ID': '007']
            ]
