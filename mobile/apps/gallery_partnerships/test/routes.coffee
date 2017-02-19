_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'

describe 'Gallery partnerships routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' } }
    @res = {
      render: sinon.stub()
      redirect: sinon.stub()
      locals: { sd: { API_URL: 'http://localhost:5000', CURRENT_PATH: '/post/post-id' } }
      status: sinon.stub()
      send: sinon.stub()
    }
    routes.__set__ 'request', @request = {}

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'reads the json into locals', (done) ->
      @res.render = (tmpl, locals) =>
        tmpl.should.equal 'index'
        locals.foo.should.equal 'bar'
        done()
      @request.get = -> end: (cb) -> cb null, { text: '{"foo": "bar"}' }
      routes.index @req, @res
