_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Search = require '../../../collections/search'
{ fabricate } = require 'antigravity'

describe 'Search routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#image', ->
    before ->
      @req =
        params: model: 'artist', id: 'foo-bar'
        pipe: sinon.stub().returns pipe: sinon.stub()
      @res = status: sinon.stub()

    it 'pipes the image request', ->
      routes.image @req, @res
      decodeURIComponent(@req.pipe.args[0][0].url).should.containEql '/artist/foo-bar/image'

    it 'sets the status code', ->
      routes.image @req, @res
      imgReq = @req.pipe.args[0][0]
      imgReq.res = statusCode: 400
      imgReq.emit 'end'
      @res.status.args[0][0].should.equal 400

  describe '#index', ->
    it 'makes the appropriate request and removes accents', ->
      req = { params: {}, query: { q: 'f\uFF4Fob\u00C0r' } }
      res = { render: sinon.stub(), locals: { sd: {} } }
      routes.index req, res
      Backbone.sync.args[0][0].should.equal 'read'
      Backbone.sync.args[0][2].data.term.should.equal 'foobAr'

    it 'redirects without query', ->
      req = { params: {}, query: { } }
      res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
      routes.index req, res
      res.redirect.args[0][0].should.equal '/'
