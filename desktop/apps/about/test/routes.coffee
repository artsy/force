sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'

twilioConstructorArgs = null
twilioSendSmsArgs = null
send = null
json = null

describe 'About routes', ->
  describe '#index', ->
    beforeEach ->
      @res = { redirect: sinon.stub(), locals: sd: IS_MOBILE: true }

    it 'redirects to collect-art if it is mobile', ->
      routes.index {}, @res
      @res.redirect.args[0].should.eql ['/collect-art']

    it 'doesnt redirect if not mobile', ->
      @res.locals.sd.IS_MOBILE = false
      routes.index {}, @res
      @res.redirect.called.should.not.be.ok()

  describe '#sendSMS', ->
    beforeEach ->
      @req = param: -> '+1 555 111 2222'
      @res = send: send = sinon.stub(), json: json = sinon.stub()

    describe 'first time', ->
      beforeEach ->
        sinon.stub routes.__get__('cache'), 'set', (key, value) =>
          @cacheSet = arguments
        twilio = routes.__get__ 'twilio'
        twilio.RestClient = class TwilioClientStub
          constructor: -> twilioConstructorArgs = arguments
          sendSms: -> twilioSendSmsArgs = arguments
        routes.sendSMS @req, @res

      afterEach ->
        routes.__get__('cache').set.restore()

      it 'sends a link with a valid phone number', ->
        twilioSendSmsArgs[0].to.should.equal '+15551112222'
        twilioSendSmsArgs[0].body.should.match /Download(.*)iPhone app/
        twilioSendSmsArgs[1] null, 'SUCCESS!'
        send.args[0][0].should.equal 201
        send.args[0][1].msg.should.containEql 'success'

      it 'throws an error if twilio doesnt like it', ->
        twilioSendSmsArgs[1] message: 'Error!'
        json.args[0][1].msg.should.equal 'Error!'

      it 'sets sent in the cache', ->
        @cacheSet[0].should.equal 'sms/iphone/+15551112222'

    describe 'second time time', ->
      beforeEach ->
        sinon.stub routes.__get__('cache'), 'get', (key, cb) ->
          cb null, 'existy'
        routes.sendSMS @req, @res

      afterEach ->
        routes.__get__('cache').get.restore()

      it 'throws an error', ->
        json.args[0][1].msg.should.equal 'Download link has already been sent to this number.'
