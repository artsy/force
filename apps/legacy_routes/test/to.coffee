sinon = require 'sinon'
to = require '../to'

describe 'to', ->
  it 'returns a function that permanently redirects to the specified path', ->
    to('/foo/bar')(null, redirect: redirect = sinon.stub())
    redirect.args[0].should.eql [301, '/foo/bar']
