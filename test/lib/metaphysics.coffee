sinon = require 'sinon'
rewire = require 'rewire'
metaphysics = rewire '../../lib/metaphysics'

describe 'metaphysics', ->
  beforeEach ->
    @__request__ = metaphysics.__get__ 'request'

    @request = {}
    @request.get = sinon.stub().returns @request
    @request.query = sinon.stub().returns @request
    @request.end = sinon.stub().returns @request

    metaphysics.__set__ 'request', @request
    metaphysics.__set__ 'METAPHYSICS_ENDPOINT', 'https://metaphysics.test'

  afterEach ->
    metaphysics.__set__ 'request', @__request__

  it 'accepts a query and variables and makes a request to the METAPHYSICS_ENDPOINT', ->
    metaphysics query = '
      query artist($id: String!) {
        artist(id: $id) {
          id
        }
      }
    ', variables = id: 'foo-bar'

    @request.get.args[0][0].should.equal 'https://metaphysics.test'
    @request.query.args[0][0].query.should.equal query
    @request.query.args[0][0].variables.should.equal variables

  describe 'success', ->
    it 'yields with the data', ->
      @request.end.yields null, ok: true, body: data: artist: id: 'foo-bar'

      metaphysics '
        query artist($id: String!) {
          artist(id: $id) {
            id
          }
        }
      ', id: 'foo-bar'
        .then (data) ->
          data.should.eql artist: id: 'foo-bar'

  describe 'error', ->
    it 'rejects with the error', ->
      @request.end.yields new Error 'some error'

      metaphysics '
        query artist($id: String!) {
          artist(id: $id) {
            id
          }
        }
      ', id: 'foo-bar'
        .catch (err) ->
          err.message.should.equal 'some error'

  describe 'partial error', ->
    it 'rejects with the errors', ->
      @request.end.yields null, ok: true, body:
        data: artist: id: 'foo-bar'
        errors: [message: 'some error']

      metaphysics '
        query artist($id: String!) {
          artist(id: $id) {
            id
          }
        }
      ', id: 'foo-bar'
        .catch (errs) ->
          errs.should.eql [message: 'some error']
