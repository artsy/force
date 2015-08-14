sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'

twilioConstructorArgs = null
twilioSendSmsArgs = null
send = null
json = null

describe 'About routes', ->
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
