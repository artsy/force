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
    routes.__set__ 'client', @client = { getFile: sinon.stub(), putBuffer: sinon.stub() }
    routes.__set__ 'request', @request = {}

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'reads the json into locals', (done) ->
      @res.render = (tmpl, locals) =>
        tmpl.should.equal 'index'
        locals.foo.should.equal 'bar'
        done()
      @request.get = -> on: -> end: (cb) -> cb null, { text: '{"foo": "bar"}' }
      @req.url = '/gallery-partnerships'
      routes.index @req, @res

  describe '#adminOnly', ->

    it 'restricts admins', ->
      @req.user = new Backbone.Model(type: 'User')
      routes.adminOnly @req, @res, next = sinon.stub()
      next.args[0][0].toString().should.containEql 'You must be logged in as an admin'

  describe '#upload', ->

    it 'uploads the file to S3', ->
      @req.body = { foo: 'bar' }
      @req.url = '/gallery-partnerships'
      routes.upload @req, @res
      @client.putBuffer.args[0][0].toString().should.equal JSON.stringify @req.body
      @client.putBuffer.args[0][3](null, {})
      @res.send.args[0][0].should.equal 200
      @res.send.args[0][1].msg.should.equal 'success'
