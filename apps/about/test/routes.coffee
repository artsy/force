_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
fs = require 'graceful-fs'
{ EventEmitter } = require 'events'
{ resolve }  = require 'path'
{ fabricate } = require 'antigravity'

describe 'About2 routes', ->

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
    routes.__set__ 'client', @client = { getFile: sinon.stub(), putBuffer: sinon.stub() }
    routes.__set__ 'request', @request = {}

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'reads the json into locals', (done) ->
      @res.render = (tmpl, locals) =>
        locals.foo.should.equal "bar"
        done()
      @request.get = -> on: -> end: (cb) -> cb { text: '{"foo": "bar"}' }
      routes.index @req, @res

  describe '#adminOnly', ->

    it 'restricts admins', ->
      @req.user = new Backbone.Model(type: 'User')
      routes.adminOnly @req, @res, next = sinon.stub()
      next.args[0][0].toString().should.containEql "You must be logged in as an admin"

  describe '#upload', ->

    it 'uploads the file to s3', ->
      @req.body = { foo: 'bar' }
      routes.upload @req, @res
      @client.putBuffer.args[0][0].toString().should.equal JSON.stringify @req.body
      @client.putBuffer.args[0][3](null, {})
      @res.send.args[0][0].should.equal 200

  describe '#sendSMS', ->

    twilioConstructorArgs = null
    twilioSendSmsArgs = null
    send = null
    json = null
    cacheSetArgs = null

    describe 'first time', ->

      beforeEach ->
        cache = routes.__get__ 'cache'
        cache.get = (key, callback) ->
          callback null, null
        cache.set = (key, value) ->
          cacheSetArgs = arguments

        twilio = routes.__get__ 'twilio'
        twilio.RestClient = class TwilioClientStub
          constructor: -> twilioConstructorArgs = arguments
          sendSms: -> twilioSendSmsArgs = arguments

        routes.sendSMS { param: -> '+1 555 111 2222' }, { send: send = sinon.stub(), json: json = sinon.stub() }

      it 'sends a link with a valid phone number', ->
        twilioSendSmsArgs[0].to.should.equal '+15551112222'
        twilioSendSmsArgs[0].body.should.match /Download(.*)iPhone app/
        twilioSendSmsArgs[1] null, 'SUCCESS!'
        send.args[0][0].should.equal 201
        send.args[0][1].msg.should.containEql 'success'

      it 'throws an error if twilio doesnt like it', ->
        twilioSendSmsArgs[1] { message: 'Error!' }
        json.args[0][1].msg.should.equal 'Error!'

      it 'sets sent in the cache', ->
        cacheSetArgs[0].should.equal 'sms/iphone/+15551112222'

    describe 'second time time', ->

      beforeEach ->
        cache = routes.__get__ 'cache'
        cache.get = (key, callback) ->
          callback null, 'value set'
        cache.set = (key, value) ->
          cacheSetArgs = arguments

        routes.sendSMS { param: -> '+1 555 111 2222' }, { send: send = sinon.stub(), json: json = sinon.stub() }

      it 'throws an error', ->
        json.args[0][1].msg.should.equal 'Download link has already been sent to this number.'
