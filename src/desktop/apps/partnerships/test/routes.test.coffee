_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'

describe 'Partnerships routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' }, query: {} }
    @res = {
      render: sinon.stub()
      redirect: sinon.stub()
      locals: { sd: { API_URL: 'http://localhost:5000', CURRENT_PATH: '/post/post-id' } }
      status: sinon.stub()
      send: sinon.stub()
    }
    @jsonPage = get: sinon.stub()
    @JSONPage = sinon.stub().returns @jsonPage
    routes.__set__ 'JSONPage', @JSONPage

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'reads the json into locals', (done) ->
      @res.render = (tmpl, locals) =>
        tmpl.should.equal 'index'
        locals.foo.should.equal 'bar'
        done()
      @req.url = '/gallery-partnerships'
      routes.index @req, @res, done
      @jsonPage.get.args[0][0] null, { foo: 'bar' }
