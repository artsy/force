sinon = require 'sinon'
to = require '../../lib/to'

describe 'to', ->
  it 'returns a function that permanently redirects to the specified path', ->
    to('/foo/bar')({ url: 'http://artsy.net/bar/foo' }, redirect: redirect = sinon.stub())
    redirect.args[0].should.eql [301, '/foo/bar']

  it 'returns a function that redirects to the specified path including the query string', ->
    to('/foo/bar')({ url: 'http://artsy.net/bar/foo?foo=bar' }, redirect: redirect = sinon.stub())
    redirect.args[0].should.eql [301, '/foo/bar?foo=bar']
