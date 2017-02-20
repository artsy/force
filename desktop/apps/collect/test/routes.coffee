sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Browse routes', ->
  beforeEach ->
    @req = {}
    @res = redirect: sinon.stub()

  describe '#redirectBrowse', ->
    it 'splits out dimension_range to width and height', ->
      @req.query = { dimension_range: '24.0-48.0' }
      routes.redirectBrowse @req, @res
      @res.redirect.args[0][1].should.equal '/collect?height=24.0-48.0&width=24.0-48.0'

    it 'handles old format for lower bounds', ->
      @req.query = { dimension_range: '*-24.0' }
      routes.redirectBrowse @req, @res
      @res.redirect.args[0][1].should.equal '/collect?height=1-24.0&width=1-24.0'
